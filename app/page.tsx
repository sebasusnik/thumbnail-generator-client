import ThumbnailsForm from '@/components/thumbnails-form'

const thumbnailsApiUrl = process.env.THUMBNAILS_API_URL || ''

export default function Home() {
  return (
    <main>
      <ThumbnailsForm thumbnailsApiUrl={thumbnailsApiUrl}></ThumbnailsForm>
    </main>
  )
}
