"use client"

import React, { useState } from 'react'
import WebhookDisplay from '@/components/webhook-display'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface FormProps {
  thumbnailsApiUrl: string
}

const ThumbnailsForm: React.FC<FormProps> = ({ thumbnailsApiUrl }) => {
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
      formData.append('image', image)
      const request = new Request(`https://ghaow6ikzb.execute-api.us-east-1.amazonaws.com/prod/upload`, {
        method: 'POST',
        headers: {
          responseUrl: '/api/response',
          'Content-Type': 'multipart/form-data'
        },
        body: formData
      })
      const response = await fetch(request)
      if (response.ok) {
        console.log('Image sent successfully')
        setSubmit(true)
      } else {
        console.error('Image sending failed')
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input type="file" accept="image/*" onChange={handleFileChange} />
        <Button type="submit">Send Image</Button>
      </form>
      {submit && <WebhookDisplay responseUrl='/api/response' />}
    </div>
  )
}

export default ThumbnailsForm