import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BlikPaymentRequest {
  transactionId: string;
  blikCode: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const paymentData: BlikPaymentRequest = await req.json();
    console.log('📥 Confirming BLIK payment for transaction:', paymentData.transactionId);

    const clientId = Deno.env.get('TPAY_CLIENT_ID');
    const clientSecret = Deno.env.get('TPAY_CLIENT_SECRET');

    if (!clientId || !clientSecret) {
      console.error('❌ TPay credentials not configured');
      return new Response(
        JSON.stringify({ error: 'Payment system not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get authorization token
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

    // Confirm payment with BLIK code
    console.log('💳 Confirming BLIK payment...');
    const blikPayload = {
      groupId: 150, // BLIK payment group
      blikPaymentData: {
        blikToken: paymentData.blikCode,
        type: 0, // Standard BLIK payment
      },
    };

    const blikResponse = await fetch(
      `https://api.tpay.com/transactions/${paymentData.transactionId}/pay`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blikPayload),
      }
    );

    const blikResponseData = await blikResponse.json();

    if (!blikResponse.ok) {
      console.error('❌ BLIK payment failed:', blikResponseData);
      return new Response(
        JSON.stringify({ 
          error: 'BLIK payment failed', 
          details: blikResponseData.message || 'Nieprawidłowy kod BLIK lub płatność nie powiodła się' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('✅ BLIK payment confirmed:', {
      transactionId: paymentData.transactionId,
      status: blikResponseData.status,
    });

    return new Response(
      JSON.stringify({
        success: true,
        transactionId: paymentData.transactionId,
        status: blikResponseData.status,
        result: blikResponseData.result,
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('❌ BLIK payment error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'BLIK payment failed', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
