import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TransactionRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  amount: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const transactionData: TransactionRequest = await req.json();
    console.log('📥 Creating transaction for:', { 
      email: transactionData.email, 
      amount: transactionData.amount 
    });

    const clientId = Deno.env.get('TPAY_CLIENT_ID');
    const clientSecret = Deno.env.get('TPAY_CLIENT_SECRET');

    if (!clientId || !clientSecret) {
      console.error('❌ TPay credentials not configured');
      return new Response(
        JSON.stringify({ error: 'Payment system not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('🔑 Using credentials:', { 
      clientId: clientId.substring(0, 10) + '...', 
      hasSecret: !!clientSecret 
    });

    // Get authorization token - use production endpoint
    // For sandbox, use: https://openapi.sandbox.tpay.com/oauth/auth
    const authUrl = 'https://api.tpay.com/oauth/auth';
    console.log('🔐 Getting TPay authorization token from:', authUrl);
    
    const authResponse = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    const authResponseText = await authResponse.text();
    console.log('📋 Auth response status:', authResponse.status);
    console.log('📋 Auth response:', authResponseText);

    if (!authResponse.ok) {
      console.error('❌ TPay auth failed:', authResponseText);
      return new Response(
        JSON.stringify({ 
          error: 'Payment authorization failed', 
          details: 'Sprawdź swoje Client ID i Client Secret w panelu TPay',
          debug: authResponseText
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const authData = JSON.parse(authResponseText);
    const accessToken = authData.access_token;
    console.log('✅ TPay authorization successful, token expires in:', authData.expires_in, 'seconds');

    // Create transaction (without BLIK code yet)
    console.log('💳 Creating transaction...');
    const transactionPayload = {
      amount: transactionData.amount,
      description: 'Priorytetowa Obsługa VIP - Konsolidacja Długów',
      payer: {
        email: transactionData.email,
        name: `${transactionData.firstName} ${transactionData.lastName}`,
        phone: transactionData.phone,
      },
      callbacks: {
        payerUrls: {
          success: `${req.headers.get('origin')}/podziekowania?payment=success`,
          error: `${req.headers.get('origin')}/payment-test?payment=error`,
        },
      },
    };

    const transactionUrl = 'https://api.tpay.com/transactions';
    console.log('📤 Sending transaction to:', transactionUrl);
    
    const transactionResponse = await fetch(transactionUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionPayload),
    });

    const transactionResponseText = await transactionResponse.text();
    console.log('📋 Transaction response status:', transactionResponse.status);
    console.log('📋 Transaction response:', transactionResponseText);

    if (!transactionResponse.ok) {
      console.error('❌ Transaction creation failed:', transactionResponseText);
      const errorData = JSON.parse(transactionResponseText);
      return new Response(
        JSON.stringify({ 
          error: 'Transaction creation failed', 
          details: errorData.message || errorData.error || 'Unknown error',
          debug: transactionResponseText
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const transactionResponseData = JSON.parse(transactionResponseText);
    console.log('✅ Transaction created:', {
      transactionId: transactionResponseData.transactionId,
      status: transactionResponseData.status,
    });

    return new Response(
      JSON.stringify({
        success: true,
        transactionId: transactionResponseData.transactionId,
        paymentUrl: transactionResponseData.transactionPaymentUrl,
        status: transactionResponseData.status,
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('❌ Transaction creation error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Transaction creation failed', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
