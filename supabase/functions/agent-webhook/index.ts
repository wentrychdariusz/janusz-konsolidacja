import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('📥 Webhook received from Make.com')
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const body = await req.json()
    console.log('📦 Received data:', JSON.stringify(body, null, 2))

    // Extract data from rows array if present, or use direct body
    const data = body.rows && body.rows.length > 0 ? body.rows[0] : body

    const leadData = {
      name: data.name || 'Nie podano',
      phone: data.phone || 'Nie podano',
      email: data.email || 'Nie podano',
      payment_status: data.payment_status || 'Nieopłacone',
      sms_verified: data.sms_verified || 'Niezweryfikowany',
      created_at: new Date().toISOString()
    }

    console.log('💾 Saving lead data:', leadData)

    // Note: This assumes you have a 'leads' table in your database
    // If not, you'll need to create it first
    const { data: savedData, error } = await supabaseClient
      .from('leads')
      .insert(leadData)
      .select()

    if (error) {
      console.error('❌ Database error:', error)
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('✅ Lead saved successfully:', savedData)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Lead saved successfully',
        data: savedData 
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('❌ Error processing webhook:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Internal server error' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
