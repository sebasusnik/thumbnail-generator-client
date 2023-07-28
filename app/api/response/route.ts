// https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next()
 
      if (done) {
        controller.close()
      } else {
        controller.enqueue(value)
      }
    },
  })
}

const encoder = new TextEncoder()

async function* makeIterator(payload: WebhookPayload) {
  yield encoder.encode(`event: ${WEBHOOK_EVENT}\n`)
  yield encoder.encode(`data: ${JSON.stringify(payload)}\n\n`)
}

import { NextRequest, NextResponse } from 'next/server'
import { WEBHOOK_EVENT } from '@/lib/constants'
import { WebhookPayload } from '@/types/types'

export function GET(req: NextRequest, res: NextResponse) {
  return new Response(null, { status: 405 })
}

export async function POST(req: NextRequest, res: NextResponse) {
  const payload = req.body as WebhookPayload
  console.log(payload)
  const iterator = makeIterator(payload)
  const stream = iteratorToStream(iterator)

  return new Response(stream)
}
