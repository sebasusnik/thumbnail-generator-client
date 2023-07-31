import ThumbnailsForm from '@/components/thumbnails-form'
import { THUMBNAILS_API_URL } from '@/lib/constants'
import { THUMBNAILS_API_KEY } from '@/lib/constants'



export default function Home() {
  return (
    <main>
      <ThumbnailsForm thumbnailsApiKey={THUMBNAILS_API_KEY} thumbnailsApiUrl={THUMBNAILS_API_URL} ></ThumbnailsForm>
    </main>
  )
}
