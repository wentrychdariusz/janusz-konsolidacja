import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface StatusRequest {
  transactionId: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { transactionId }: StatusRequest = await req.json();
    console.log('📋 Checking payment status for transaction:', transactionId);

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
        JSON.stringify({ error: 'Authorization failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    // Check transaction status
    const statusResponse = await fetch(
      `https://api.tpay.com/transactions/${transactionId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!statusResponse.ok) {
      console.error('❌ Failed to get transaction status');
      return new Response(
        JSON.stringify({ error: 'Failed to check status' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const statusData = await statusResponse.json();
    console.log('✅ Full TPay response:', JSON.stringify(statusData, null, 2));
    console.log('📊 Transaction status:', statusData.status);
    console.log('💳 Payments object:', statusData.payments);

    return new Response(
      JSON.stringify({
        transactionId,
        status: statusData.status,
        paymentStatus: statusData.payments?.status,
        fullResponse: statusData, // Zwracamy pełną odpowiedź do debugowania
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('❌ Status check error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to check status', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
