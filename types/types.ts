// Declare and export a custom type alias for HTTP methods using union types
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

// Declare and export a custom type alias for error messages using union types
export type ErrorMessage = 'Method not allowed' | 'Bad request' | 'Internal server error' | 'Not found'

interface Thumbnail {
  size: {
    width: number
    height: number
  }
  fileSize: number
  url: string
}

export type WebhookPayload = Partial<{
  originalImageUrl: string
  // Use Thumbnail as the element type of the thumbnails array
  thumbnails: Array<Thumbnail>
  metadata: {
    fileSize: number
    type: string
    filename: string
  }
}>

// Declare and export the type for the component props
export type WebhookDisplayProps = {
  responseUrl: string
}