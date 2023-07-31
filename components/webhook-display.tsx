"use client"

import React, { useEffect, useState } from 'react'

// Import WebhookPayload and WebhookDisplayProps types from types.ts file
import { WebhookPayload, WebhookDisplayProps } from '@/types/types'

const WebhookDisplay: React.FC<WebhookDisplayProps> = ({ responseUrl }) => {
  // Use the WebhookPayload type to annotate the state variable without partial
  const [webhookData, setWebhookData] = useState<WebhookPayload>({})

  // Fetch the webhook data from the response URL using SWR
  // SWR will automatically revalidate the data when the cache is updated
  const { data, error } = useSWR(responseUrl)

  useEffect(() => {
    if (data) {
      setWebhookData(data)
    }
  }, [data])

  if (error) return (
    <div>
      {error}
    </div>
  )
  
  return (
    <div>
      {webhookData ? (
        <div>
          <h1>Webhook Data</h1>
          <p>Original Image URL: {webhookData.originalImageUrl ?? 'N/A'}</p>
          <p>Thumbnails:</p>
          <ul>
            {webhookData.thumbnails?.map((thumbnail, index) => (
              <li key={index}>
                Size: {thumbnail.size?.width ?? 0} x {thumbnail.size?.height ?? 0}
                <br />
                File Size: {thumbnail.fileSize ?? 0}
                <br />
                URL: {thumbnail.url ?? 'N/A'}
              </li>
            )) ?? <li>No thumbnails available</li>}
          </ul>
          <p>Metadata:</p>
          <ul>
            <li>File Size: {webhookData.metadata?.fileSize ?? 0}</li>
            <li>Type: {webhookData.metadata?.type ?? 'N/A'}</li>
            <li>Filename: {webhookData.metadata?.filename ?? 'N/A'}</li>
          </ul>
        </div>
      ) : (
        <p>Waiting for webhook...</p>
      )}
    </div>
  )
}

export default WebhookDisplay

function useSWR(responseUrl: string): { data: any; error: any } {
  throw new Error('Function not implemented.')
}
