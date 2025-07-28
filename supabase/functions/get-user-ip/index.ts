import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Pobierz IP z różnych możliwych headerów
    const forwardedFor = req.headers.get('x-forwarded-for')
    const realIp = req.headers.get('x-real-ip')
    const cfConnectingIp = req.headers.get('cf-connecting-ip')
    
    // Preferuj kolejność: CF-Connecting-IP, X-Real-IP, X-Forwarded-For
    let clientIp = cfConnectingIp || realIp || forwardedFor
    
    // Jeśli X-Forwarded-For zawiera wiele IP (proxy chain), weź pierwsze
    if (clientIp && clientIp.includes(',')) {
      clientIp = clientIp.split(',')[0].trim()
    }
    
    // Fallback na connection info jeśli nic nie znaleziono
    if (!clientIp) {
      const connInfo = (req as any).conn?.remoteAddr
      if (connInfo) {
        clientIp = connInfo.hostname || connInfo.host
      }
    }
    
    console.log('IP Headers:', {
      'x-forwarded-for': forwardedFor,
      'x-real-ip': realIp,
      'cf-connecting-ip': cfConnectingIp,
      'final-ip': clientIp
    })

    return new Response(
      JSON.stringify({ 
        ip: clientIp || 'unknown',
        timestamp: new Date().toISOString()
      }),
      {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      },
    )
  } catch (error) {
    console.error('Error getting IP:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to get IP',
        ip: 'unknown'
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      },
    )
  }
})