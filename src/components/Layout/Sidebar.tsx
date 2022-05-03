import {
  Button,
  Group,
  Navbar,
  ScrollArea,
  Text,
  TextInput,
  ThemeIcon,
} from '@mantine/core'
import { useState } from 'react'
import { Code, Heart, Search } from 'tabler-icons-react'
import { open } from '@tauri-apps/api/shell'
import TagsContainer from '../UI/TagsContainer'
import FolderContainer from '../UI/FolderContainer'
export default function Sidebar() {
  const [keyWords, setKeyWords] = useState('')

  const openExternal = (url: string) => {
    open(url)
  }
  return (
    <Navbar
      className='w-280px h-auto flex-none divide-y  bg-sky-50 shadow-md'
      sx={(theme) => ({
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
      })}
    >
      <Navbar.Section>
        <div className='flex flex-row p-2'>
          <TextInput
            name='keywords'
            value={keyWords}
            icon={<Code size={18} />}
            sx={() => ({
              '.mantine-TextInput-input': {
                borderRadius: '0px',
                borderRight: '0',
              },
            })}
            onChange={(e) => setKeyWords(e.target.value)}
          />
          <Button
            sx={() => ({
              borderRadius: 0,
            })}
          >
            <Search size={20} />
          </Button>
        </div>
      </Navbar.Section>
      <Navbar.Section grow>
        <ScrollArea type='scroll' scrollbarSize={2} className='flex-1 p-4 '>
          <FolderContainer />
          <TagsContainer />
        </ScrollArea>
      </Navbar.Section>
      <Navbar.Section className='flex h-60px flex-none p-2 justify-center align-center'>
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
      </Navbar.Section>
    </Navbar>
  )
}
