"use client"

import React, { useEffect, useState } from 'react'

// Import WebhookPayload and WebhookDisplayProps types from types.ts file
import { WebhookPayload, WebhookDisplayProps } from '@/types/types'

const WebhookDisplay: React.FC<WebhookDisplayProps> = ({ responseUrl }) => {
  // Use the WebhookPayload type to annotate the state variable without partial
  const [webhookData, setWebhookData] = useState<WebhookPayload | null>(null)

  useEffect(() => {
    const intervalId = setInterval(async () => {
      // Make a GET request to your API route
      const res = await fetch(responseUrl)
  
      try {
        // Try to parse the JSON data
        const payload = await res.json()

        console.log(payload)
  
        if (payload) {
          // Update the state with the payload
          setWebhookData(payload)
  
          // Clear the interval if you only want to update the state once
          clearInterval(intervalId)
        }
      } catch (err) {
        // If an error occurs, log the error and continue polling
        console.error(err)
      }
    }, 2000) // Check for new payloads every 2 seconds
  
    return () => {
      clearInterval(intervalId)
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
