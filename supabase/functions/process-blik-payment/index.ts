import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaymentRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  blikCode: string;
  amount: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const paymentData: PaymentRequest = await req.json();
    console.log('📥 Received payment request:', { 
      email: paymentData.email, 
      amount: paymentData.amount 
    });

    // Get TPay credentials from environment
    const clientId = Deno.env.get('TPAY_CLIENT_ID');
    const clientSecret = Deno.env.get('TPAY_CLIENT_SECRET');

    if (!clientId || !clientSecret) {
      console.error('❌ TPay credentials not configured');
      return new Response(
        JSON.stringify({ error: 'Payment system not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Step 1: Get authorization token
    console.log('🔐 Getting TPay authorization token...');
    const authResponse = await fetch('https://api.tpay.com/oauth/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    if (!authResponse.ok) {
      const authError = await authResponse.text();
      console.error('❌ TPay auth failed:', authError);
      return new Response(
        JSON.stringify({ error: 'Payment authorization failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const authData = await authResponse.json();
    const accessToken = authData.access_token;
    console.log('✅ TPay authorization successful');

    // Step 2: Create BLIK transaction
    console.log('💳 Creating BLIK transaction...');
    const transactionPayload = {
      amount: paymentData.amount,
      description: 'Priorytetowa Obsługa VIP - Konsolidacja Długów',
      payer: {
        email: paymentData.email,
        name: `${paymentData.firstName} ${paymentData.lastName}`,
        phone: paymentData.phone,
      },
      pay: {
        groupId: 150, // BLIK payment group
        blikPaymentData: {
          blikToken: paymentData.blikCode,
          type: 0, // Standard BLIK payment
        },
      },
      callbacks: {
        payerUrls: {
          success: `${req.headers.get('origin')}/podziekowania?payment=success`,
          error: `${req.headers.get('origin')}/payment-test?payment=error`,
        },
      },
    };

    console.log('📤 Sending transaction to TPay:', {
      amount: transactionPayload.amount,
      email: transactionPayload.payer.email,
    });

    const transactionResponse = await fetch('https://api.tpay.com/transactions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionPayload),
    });

    const transactionData = await transactionResponse.json();

    if (!transactionResponse.ok) {
      console.error('❌ Transaction creation failed:', transactionData);
      return new Response(
        JSON.stringify({ 
          error: 'Payment failed', 
          details: transactionData.message || 'Unknown error' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('✅ Transaction created successfully:', {
      transactionId: transactionData.transactionId,
      status: transactionData.status,
    });

    return new Response(
      JSON.stringify({
        success: true,
        transactionId: transactionData.transactionId,
        status: transactionData.status,
        paymentUrl: transactionData.transactionPaymentUrl,
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('❌ Payment processing error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Payment processing failed', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
