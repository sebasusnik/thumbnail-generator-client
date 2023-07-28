import { thumbnailsApiUrl } from '@/lib/constants'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  console.log('thumbnailsApiUrl:', thumbnailsApiUrl)
  // Forward the POST request to your AWS API
  console.log(req.headers, req.body)
  const response = await fetch(`${thumbnailsApiUrl}`, {
    method: 'POST',
    headers: req.headers,
    body: req.body
  })

  console.log({response})

  // Return the response from your AWS API
  const data = await response.json()
  return NextResponse.json(data)
}
