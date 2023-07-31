import type { NextApiRequest, NextApiResponse } from 'next'
import { WEBHOOK_EVENT } from '@/lib/constants'
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

      res.setHeader('Content-Type', 'text/event-stream')
      res.setHeader('Cache-Control', 'no-cache')
      res.setHeader('Connection', 'keep-alive')

      res.write(`event: ${WEBHOOK_EVENT}\n`)
      res.write(`data: ${JSON.stringify(payload)}\n\n`)

      req.on('close', () => {
        res.end()
      })
    } else {
      res.status(405).json({ message: 'Method not allowed' })
    }
  })
}
