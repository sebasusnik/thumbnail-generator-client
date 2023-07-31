"use client"

import React, { useState } from 'react'
import WebhookDisplay from '@/components/webhook-display'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface FormProps {
  thumbnailsApiUrl: string
  thumbnailsApiKey: string
}

const ThumbnailsForm: React.FC<FormProps> = ({ thumbnailsApiUrl, thumbnailsApiKey }) => {
  const [image, setImage] = useState<File | null>(null)
  const [submit, setSubmit] = useState<boolean>(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImage(file)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (image) {
      const formData = new FormData()
      formData.append('file', image)
  
      const response = await fetch(thumbnailsApiUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'X-API-Key': thumbnailsApiKey,
          'X-Callback-URL': 'http://192.168.0.19:3000/api/response'
        },
        body: formData
      })
      if (response.ok) {
        console.log('Image sent successfully', {response})
        setSubmit(true)
      } else {
        console.error('Image sending failed', {response})
      }
    }
  }
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input type="file" accept="image/*" onChange={handleFileChange} />
        <Button type="submit">Send Image</Button>
      </form>
      <WebhookDisplay responseUrl='/api/response' />
    </div>
  )
}

export default ThumbnailsForm
