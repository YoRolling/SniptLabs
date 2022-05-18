import { SnippentService } from '@/services'
import { navFilterAtom } from '@/store/NavFilter'
import { ScrollArea, Box, Group, Input, InputWrapper } from '@mantine/core'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { ListSearch, Plus } from 'tabler-icons-react'
import SinppentItem from './components/SinppetItem'

export default function Index() {
  return <IndexApp />
}

function IndexApp() {
  const navigation = useNavigate()
  const params: { id: string } = useParams() as { id: string }
  const filter = useAtomValue(navFilterAtom)
  const [snippetList, setSnippetList] = useState<Snippent[]>([])
  const preCreateSnippet = () => {
    navigation('editor')
  }
  const showPreview = () => {
    navigation(params.id)
  }
  useEffect(() => {
    const { type, params } = filter
    switch (type) {
      case 'folder':
        // eslint-disable-next-line no-case-declarations
        const { id } = params || {}
        SnippentService.filterByFolder(id!).then(setSnippetList)
        break
      case 'pinned':
        SnippentService.getPinnedSnippents()
          .then(setSnippetList)
          .catch(() => setSnippetList([]))
        break
      default:
        SnippentService.getInboxSnippets().then(setSnippetList)
    }
  }, [filter])
  return (
    <div className='flex divide-x h-full overflow-hidden'>
      <div className='w-280px flex flex-col flex-none divide-y'>
        <Group className='flex-none flex px-2 my-2 mt-4 overflow-hidden'>
          <InputWrapper className='flex-1'>
            <Input
              variant='unstyled'
              placeholder='Search'
              icon={<ListSearch size={16} />}
            />
          </InputWrapper>
          <Plus
            size={18}
            onClick={preCreateSnippet}
            color='gray'
            className='cursor-pointer'
          />
        </Group>
        <ScrollArea scrollbarSize={2} className='flex-1 pt-2'>
          <Box className='divide-y'>
            {snippetList.map((snippet) => {
              return (
                <SinppentItem
                  item={snippet}
                  key={snippet.id}
                  onClick={showPreview}
                  active={snippet.id == params.id}
                />
              )
            })}
          </Box>
        </ScrollArea>
      </div>
      <div className='content flex-1 p-1 overflow-hidden'>
        <Outlet />
      </div>
    </div>
  )
}
