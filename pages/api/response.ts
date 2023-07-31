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

    if (req.method === 'POST') {
      const payload = req.body as WebhookPayload

      console.log(payload)

      // Send a status OK response to the lambda function
      res.status(200).json({ message: 'Webhook received' })
    } else {
      res.status(405).json({ message: 'Method not allowed' })
    }
  })
}
