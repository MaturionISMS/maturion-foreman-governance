import { NextRequest, NextResponse } from 'next/server'

/**
 * GitHub Webhook handler
 * Receives webhook events from GitHub
 */
export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const event = request.headers.get('x-github-event')
    
    console.log('Received GitHub webhook:', event)
    console.log('Payload:', payload)
    
    // TODO: Validate webhook signature
    // TODO: Process different event types
    // TODO: Trigger Foreman tasks based on events
    
    return NextResponse.json({ 
      success: true, 
      message: 'Webhook received',
      event 
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'GitHub webhook endpoint',
    method: 'POST only'
  })
}
