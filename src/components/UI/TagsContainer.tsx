import { TagService } from '@/services'
import { Group, Stack, Title } from '@mantine/core'
import { useEffect, useState } from 'react'
import SidebarNavItem from './SidebarNavItem'
import { LineWobble } from '@uiball/loaders'
import { Plus, Tags } from 'tabler-icons-react'
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
    return <LineWobble size={246} lineWeight={5} speed={1.75} color='black' />
  }
  if (error) {
    return <div>Error</div>
  }
  return (
    <Stack spacing={4}>
      <Group>
        <Title className='uppercase flex-1 px-2 py-1 text-sm rounded text-gray-500 dark:text-gray-100'>
          tag
        </Title>
        <Plus size={16} className='cursor-pointer' />
      </Group>
      {tagsList.map((tag: Tag) => {
        return (
          <SidebarNavItem key={tag.id} item={tag} icon={<Tags size={18} />} />
        )
      })}
    </Stack>
  )
}
