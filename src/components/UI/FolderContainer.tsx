import { FolderService } from '@/services'
import { Group, Title, Stack } from '@mantine/core'
import { LineWobble } from '@uiball/loaders'
import { useEffect, useState } from 'react'
import { Folders, Plus } from 'tabler-icons-react'
import SidebarNavItem from './SidebarNavItem'

export default function FolderContainer() {
  const [folderList, setFolderList] = useState<Folder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  useEffect(() => {
    FolderService.selectAllFolders()
      .then((res: Folder[]) => {
        setFolderList(res)
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
        <Title className='uppercase flex-1 py-1 text-sm rounded text-gray-500 dark:text-gray-100'>
          folder
        </Title>
        <Plus size={16} className='cursor-pointer' />
      </Group>
      {folderList.map((tag: Tag) => {
        return (
          <SidebarNavItem
            className='pl-5'
            key={tag.id}
            item={tag}
            icon={<Folders size={18} />}
            baseUrl='/folder/'
          />
        )
      })}
    </Stack>
  )
}
