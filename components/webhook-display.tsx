"use client"

import React, { useEffect, useState } from 'react'

// Import WEBHOOK_EVENT constant from constants.ts file
import { WEBHOOK_EVENT } from '@/lib/constants'

// Import WebhookPayload and WebhookDisplayProps types from types.ts file
import { WebhookPayload, WebhookDisplayProps } from '@/types/types'

const WebhookDisplay: React.FC<WebhookDisplayProps> = ({ responseUrl }) => {
  // Use the WebhookPayload type to annotate the state variable without partial
  const [webhookData, setWebhookData] = useState<WebhookPayload>({})

  useEffect(() => {
    setWebhookData({})
    const eventSource = new EventSource(responseUrl)
    
    eventSource.addEventListener(WEBHOOK_EVENT, (event) => {
      // Use the WebhookPayload type to cast the event data without partial
      const data = event.data as WebhookPayload
      setWebhookData(data)
    })
    return () => {
      eventSource.close()
    }
  }, [responseUrl])

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