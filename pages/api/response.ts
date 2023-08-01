import type { NextApiRequest, NextApiResponse } from 'next'
import { withCache } from '@vercel/cache'
import { LocalCache } from '@/lib/local-cache'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Use the Vercel Data Cache in production and the local cache in development
  const cache = process.env.NODE_ENV === 'production' ? withCache(req, res) : new LocalCache()

  // Get the payload from the cache
  const payload = await cache.get('webhookPayload')

  if (req.method === 'POST') {
    // Store the payload in the cache
    await cache.set('webhookPayload', req.body)

    // Send a status OK response to the lambda function
    res.status(200).json({ message: 'Webhook received' })
  } else if (req.method === 'GET') {
    if (payload === undefined) {
      // If the payload is undefined, return an error response
      res.status(404).json({ message: 'Webhook not found' })
    } else {
      // Otherwise, send the payload as a response
      res.status(200).json(payload)
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

export default handler
