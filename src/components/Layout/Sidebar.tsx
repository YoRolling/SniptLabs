import { Navbar, ScrollArea, Stack } from '@mantine/core'
import { Inbox, Pinned } from 'tabler-icons-react'
import FolderContainer from '../UI/FolderContainer'
import SidebarNavItem from '../UI/SidebarNavItem'
export default function Sidebar() {
  return (
    <Navbar className='w-240px h-auto flex-none bg-sky-50 shadow-md'>
      <Navbar.Section grow>
        <ScrollArea type='scroll' scrollbarSize={2} className='flex-1 p-4 '>
          <Stack spacing={4}>
            <SidebarNavItem
              item={{ id: 'inbox', name: 'Inbox' }}
              icon={<Inbox size={18} />}
              className='capitalize tracking-wide font-bold'
            />
            <SidebarNavItem
              item={{ id: 'pinned', name: 'pinned' }}
              icon={<Pinned size={18} />}
              className='capitalize tracking-wide font-bold'
            />
          </Stack>
          <Stack className='mt-3'>
            <FolderContainer />
          </Stack>
        </ScrollArea>
      </Navbar.Section>
      {/* <Navbar.Section className='flex h-60px flex-none p-2 justify-center align-center'>
        <Group
          align='center'
          position='center'
          onClick={() => {
            openExternal('https://github.com')
          }}
          className='cursor-pointer'
        >
          <ThemeIcon color='pink'>
            <Heart size={24} />
          </ThemeIcon>
          <Text style={{ fontFamily: 'Hack' }}>Love & Peace</Text>
        </Group>
      </Navbar.Section> */}
    </Navbar>
  )
}
