import { FolderService } from '@/services'
import { LineWobble } from '@uiball/loaders'
import { useEffect, useState } from 'react'
import { Folders } from 'tabler-icons-react'
import DetailNative from './DetailNative'
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
    return <LineWobble size={80} lineWeight={5} speed={1.75} color='black' />
  }
  if (error) {
    return <div>Error</div>
  }
  return (
    <DetailNative title='folder'>
      {folderList.map((v) => (
        <SidebarNavItem key={v.id} item={v} icon={<Folders size={16}/>}  baseUrl="/folder/"/>
      ))}
    </DetailNative>
  )
}
