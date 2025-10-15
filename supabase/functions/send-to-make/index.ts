import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting send-to-make function');

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get all leads with paid status
    const { data: leads, error: fetchError } = await supabase
      .from('leads')
      .select('*')
      .eq('payment_status', 'Opłacone')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Error fetching leads:', fetchError);
      throw fetchError;
    }

    console.log(`Found ${leads?.length || 0} paid leads`);

    // Make.com webhook URL
    const makeWebhookUrl = 'https://hook.eu2.make.com/janusz-go-ba-63dd01e7';

    // Send each lead to Make.com
    const results = [];
    for (const lead of leads || []) {
      try {
        console.log(`Sending lead ${lead.id} to Make.com`);
        
        const response = await fetch(makeWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            rows: [{
              name: lead.name,
              phone: lead.phone,
              email: lead.email,
              payment_status: lead.payment_status,
            }]
          }),
        });

        const responseText = await response.text();
        console.log(`Make.com response for lead ${lead.id}:`, responseText);

        results.push({
          lead_id: lead.id,
          success: response.ok,
          status: response.status,
        });
      } catch (error) {
        console.error(`Error sending lead ${lead.id}:`, error);
        results.push({
          lead_id: lead.id,
          success: false,
          error: error.message,
        });
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        total_leads: leads?.length || 0,
        results 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in send-to-make function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});