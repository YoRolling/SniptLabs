import { Navbar, ScrollArea, Stack, UnstyledButton } from '@mantine/core'
import { NavLink } from 'react-router-dom'
import { Inbox, Pinned, Settings } from 'tabler-icons-react'
import FolderContainer from '../UI/FolderContainer'
import SidebarNavItem from '../UI/SidebarNavItem'
export default function Sidebar() {
  return (
    <Navbar className='w-240px h-auto flex-none bg-sky-50 shadow-md'>
      <Navbar.Section grow className='overflow-auto'>
        <ScrollArea type='scroll' scrollbarSize={2} className='flex-1 overflow-auto p-4 '>
          <Stack spacing={4}>
            <SidebarNavItem
              item={{ id: 'inbox', name: 'Inbox' }}
              icon={<Inbox size={18} />}
              className='capitalize tracking-wide font-bold !py-2'
            />
            <SidebarNavItem
              item={{ id: 'pinned', name: 'pinned' }}
              icon={<Pinned size={18} />}
              className='capitalize tracking-wide font-bold !py-2'
            />
          </Stack>
          <Stack className='mt-3'>
            <FolderContainer />
          </Stack>
        </ScrollArea>
      </Navbar.Section>
      <Navbar.Section className='flex  flex-none p-2 justify-center align-center'>
        <UnstyledButton
          component={NavLink}
          to='/settings'
          className={`flex items-center gap-4px p-2 text-xs rounded no-underline w-full text-gray-500 capitalize font-mono font-bold dark:text-gray-100 `}
          sx={(theme) => ({
            '&.active': {
              color: '#FFF',
              backgroundColor: theme.colors.indigo['4'],
            },
          })}
        >
          <Settings size={18} />
          settings
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  )
}
