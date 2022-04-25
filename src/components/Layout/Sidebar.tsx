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

export default function Sidebar() {
  const [keyWords, setKeyWords] = useState('')

  const openExternal = (url: string) => {
    open(url)
  }
  return (
    <Navbar className='w-280px flex-none divide-y'>
      <Navbar.Section>
        <div className='header capitalize text-2xl font-bolder text-shadow-lg  text-center  text-pink-500 dark:text-white w-fullx leading-loose py-4'>
          Snippets Labs
        </div>
      </Navbar.Section>
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
        <ScrollArea
          type='scroll'
          scrollbarSize={2}
          className='flex-1'
        ></ScrollArea>
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
