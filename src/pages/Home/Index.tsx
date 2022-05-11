import { SnippentService } from '@/services'
import {
  ScrollArea,
  Box,
  Group,
  Button,
  Input,
  InputWrapper,
} from '@mantine/core'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { ListSearch, Plus } from 'tabler-icons-react'
import SinppentItem from './components/SinppetItem'

export default function Index() {
  return <IndexApp />
}

function IndexApp() {
  const navigation = useNavigate()
  const params = useParams()
  console.log({ params })

  const [snippetList, setSnippetList] = useState<Snippent[]>([])
  const preCreateSnippet = () => {
    console.log('preCreateSnippet')
    navigation('editor')
  }
  const showPreview = () => {
    navigation('12')
  }
  useEffect(() => {
    SnippentService.selectAll()
      .then((res) => {
        console.log(res)
        setSnippetList(res)
      })
      .catch((error) => console.log(error))
  }, [])
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
