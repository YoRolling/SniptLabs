import { ScrollArea, Box, Group, Button } from '@mantine/core'
import { Outlet, useNavigate } from 'react-router-dom'
import { Plus } from 'tabler-icons-react'
import SinppentItem from './components/SinppetItem'

export default function Index() {
  return <IndexApp />
}

function IndexApp() {
  const navigation = useNavigate()
  const preCreateSnippet = () => {
    console.log('preCreateSnippet')
    navigation('editor')
  }
  const showPreview = () => {
    navigation('12')
  }
  return (
    <div className='flex divide-x h-full overflow-hidden'>
      <div className='w-260px flex flex-col flex-none'>
        <Group
          position='right'
          className='flex-none px-2 my-2 mt-4 overflow-hidden'
        >
          <Button compact variant='outline' onClick={preCreateSnippet}>
            <Plus size={18} />
          </Button>
        </Group>
        <ScrollArea scrollbarSize={2} className='flex-1'>
          <Box className='divide-y'>
            <SinppentItem item={{ name: 'test' }} onClick={showPreview} />
          </Box>
        </ScrollArea>
      </div>
      <div className='content flex-1 p-1 overflow-hidden'>
        <Outlet />
      </div>
    </div>
  )
}
