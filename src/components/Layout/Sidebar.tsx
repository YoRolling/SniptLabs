import {
  Button,
  Group,
  Navbar,
  ScrollArea,
  Text,
  TextInput,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core'
import { useEffect, useState } from 'react'
import { Code, Heart, Search } from 'tabler-icons-react'
import { open } from '@tauri-apps/api/shell'
import { FolderService } from '@/services'
import DetailNative from '../UI/DetailNative'
export default function Sidebar() {
  const [keyWords, setKeyWords] = useState('')
  const [folderList, setFolderList] = useState<Folder[]>([])
  useEffect(() => {
    FolderService.selectAllFolders()
      .then((res) => {
        setFolderList(res)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  const openExternal = (url: string) => {
    open(url)
  }
  return (
    <Navbar
      className='w-280px flex-none divide-y  bg-sky-50 shadow-lg'
      sx={(theme) => ({
        // borderRadius: `0 ${theme.radius.lg}px ${theme.radius.lg}px 0`,
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
      })}
    >
      {/* <Navbar.Section>
        <div className='header capitalize text-2xl font-bolder text-shadow-lg  text-center  text-pink-500 dark:text-white w-fullx leading-loose py-4'>
          Snippets Labs
        </div>
      </Navbar.Section> */}
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
          <DetailNative title='folder'>
            {folderList.map((v) => (
              <UnstyledButton
                className='p-2 py-1 h-40px text-sm w-full hover:(bg-indigo-500 text-gray-500)'
                key={v.id}
              >
                {v.name}
              </UnstyledButton>
            ))}
          </DetailNative>
          <DetailNative title='tags'>
            {folderList.map((v) => (
              <UnstyledButton
                className='p-2 py-1 h-40px text-sm w-full hover:(bg-slate-300 text-gray-500)'
                key={v.id}
              >
                {v.name}
              </UnstyledButton>
            ))}
          </DetailNative>
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
