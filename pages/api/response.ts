import type { NextApiRequest, NextApiResponse } from 'next'
import { WebhookPayload } from '@/types/types'

import Cors from 'cors'

const cors = Cors({
  origin: '*',
  methods: ['GET', 'HEAD', 'POST'],
})


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  cors(req, res, (err: Error) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' })
      return
    }

    // Create a global variable to store the payload
    let webhookPayload: WebhookPayload | undefined

    if (req.method === 'POST') {
      const payload = req.body as WebhookPayload

      console.log('Received payload:', payload)

      // Store the payload in the global variable
      webhookPayload = payload

      console.log('Webhook payload set')

      // Send a status OK response to the lambda function
      res.status(200).json({ message: 'Webhook received' })
    } else if (req.method === 'GET') {
      // Get the payload from the global variable
      const payload = webhookPayload

      console.log('Retrieved payload from cache:', payload)

      if (payload === undefined) {
        // If the payload is undefined, return an error response
        res.status(404).json({ message: 'Webhook not found' })
      } else {
        console.log('Sending payload:', payload)
        // Otherwise, send the payload as a response
        res.status(200).json(payload)
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' })
    }
  })
}
