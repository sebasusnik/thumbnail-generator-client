// Import NextApiRequest and NextApiResponse types
import { WEBHOOK_EVENT } from '@/lib/constants'
import { WebhookPayload } from '@/types/types'
import type { NextApiRequest, NextApiResponse } from 'next'

// Import WEBHOOK_EVENT constant from constants.ts file


// Export a default function that handles the request and response
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request method is POST
  if (req.method === 'POST') {
    console.log(req)
    // Use the request body directly as the payload
    const payload = req.body as WebhookPayload

    console.log(payload)

    // Set the response headers to indicate that this is an event stream
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    // Send a webhook event to the client with the payload as data using WEBHOOK_EVENT constant instead of string literal 
    res.write(`event: ${WEBHOOK_EVENT}\n`)
    res.write(`data: ${JSON.stringify(payload)}\n\n`)

    // Keep the connection open until the client closes it or an error occurs
    req.on('close', () => {
      res.end()
    })
  } else {
    // Handle any other HTTP method (e.g. return an error message)
    res.status(405).json({ message: 'Method not allowed' })
  }
}