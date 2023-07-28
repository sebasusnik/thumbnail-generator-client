import ThumbnailsForm from '@/components/thumbnails-form'
import { thumbnailsApiUrl } from '@/lib/constants'


export default function Home() {
  return (
    <main>
      <ThumbnailsForm thumbnailsApiUrl={thumbnailsApiUrl}></ThumbnailsForm>
    </main>
  )
}
