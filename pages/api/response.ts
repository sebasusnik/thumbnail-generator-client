// api/response.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { WebhookPayload } from '@/types/types'

import Cors from 'cors'
import { LRUCache } from 'lru-cache'

const cors = Cors({
  origin: '*',
  methods: ['GET', 'HEAD', 'POST'],
})

// Create a cache instance
const cache = new LRUCache({ max: 100, ttl: 1000 * 60 * 60 })

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  cors(req, res, (err: Error) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' })
      return
    }

    if (req.method === 'POST') {
      const payload = req.body as WebhookPayload

      console.log(payload)

      // Store the payload in the cache with a key of 'webhook'
      cache.set('webhook', payload)

      console.log('Cache set for webhook')

      // Send a status OK response to the lambda function
      res.status(200).json({ message: 'Webhook received' })
    } else if (req.method === 'GET') {
      // Get the payload from the cache with the key of 'webhook'
      const payload = cache.get('webhook')

      if (payload === undefined) {
        // If the payload is undefined, return an error response
        res.status(404).json({ message: 'Webhook not found' })
      } else {
        console.log(payload)
        // Otherwise, send the payload as a response
        res.status(200).json({ payload })
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' })
    }
  })
}
