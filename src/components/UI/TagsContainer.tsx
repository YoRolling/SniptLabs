import DetailNative from './DetailNative'
import { TagService } from '@/services'
import { useEffect, useState } from 'react'
import SidebarNavItem from './SidebarNavItem'
import { LineWobble } from '@uiball/loaders'
export default function TagsContainer() {
  const [tagsList, setTagsList] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  useEffect(() => {
    TagService.selectAll()
      .then((res: Tag[]) => {
        setTagsList(res)
        console.log(res)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  if (loading) {
    return <LineWobble size={80} lineWeight={5} speed={1.75} color='black' />
  }
  if (error) {
    return <div>Error</div>
  }
  return (
    <DetailNative title='tags'>
      {tagsList.map((tag: Tag) => {
        return <SidebarNavItem key={tag.id} item={tag} />
      })}
    </DetailNative>
  )
}
