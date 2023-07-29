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
      formData.append('file', image)
  
      const response = await fetch('https://jucn2y06m2.execute-api.us-east-1.amazonaws.com/prod/upload', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Callback-URL': 'https://thumbnail-generator-client.vercel.app/api/response'
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
