import { FolderService } from '@/services'
import {
  Group,
  Title,
  Stack,
  Modal,
  TextInput,
  Button,
  Menu,
  Text,
  Code,
} from '@mantine/core'
import { useModals } from '@mantine/modals'
import { LineWobble } from '@uiball/loaders'
import React, { useEffect, useRef, useState } from 'react'
import {
  ArrowsLeftRight,
  Folder,
  Folders,
  Plus,
  Trash,
} from 'tabler-icons-react'
import SidebarNavItem from './SidebarNavItem'

export default function FolderContainer() {
  const [folderList, setFolderList] = useState<Folder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [visible, toggle] = useState(false)
  const textInputRef = useRef<HTMLInputElement>(null)
  const modals = useModals()
  const [defaultFolderName, setDefaultFolderName] = useState('')
  const dismiss = () => {
    toggle(false)
    setDefaultFolderName('')
  }
  const open = () => {
    toggle(true)
  }
  useEffect(() => {
    FolderService.selectAllFolders()
      .then((res: Folder[]) => {
        setFolderList(res)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  const confirmDelete = (folder: Folder) => {
    const { id, name } = folder
    if (!id) {
      return
    }
    if (!folder.id) return
    modals.openConfirmModal({
      title: <Text className='font-mono'>Confirm Delete Folder</Text>,
      children: (
        <Stack>
          <Text size='xs' className='font-mono' color='red'>
            Are you sure you want to delete <Code color='red'>{name}</Code>{' '}
            folder ?
          </Text>
          <Text size='xs' className='font-mono'>
            All Snippets in this folder will be move to the root folder.
          </Text>
        </Stack>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red', size: 'xs' },
      cancelProps: { size: 'xs' },
      centered: true,
      trapFocus: false,
      onConfirm: () => {
        // TODO: delete folder
        console.log('delete folder')
        FolderService.delById(id)
          .then(() => {
            setFolderList((prev) => prev.filter((f) => f.id !== id))
          })
          .finally(() => {
            setDefaultFolderName('')
          })
      },
    })
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = textInputRef.current?.value
    if (name) {
      setLoading(true)
      FolderService.createFolder(name)
        .then((res: number) => {
          setFolderList([...folderList, { id: res + '', name } as Folder])
        })
        .catch(() => {
          setError(true)
        })
        .finally(() => {
          setLoading(false)
          console.log('finally')
          dismiss()
        })
    }
  }
  const prepareRename = (folder: Folder) => {
    setDefaultFolderName(folder.name)
    open()
  }
  const rightSection = (folder: Folder) => {
    return (
      <Menu
        className='ml-auto'
        size='sm'
        withArrow
        onClick={(e) => e.stopPropagation()}
      >
        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item
          icon={<ArrowsLeftRight size={14} />}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            prepareRename(folder)
          }}
        >
          Rename
        </Menu.Item>
        <Menu.Item
          color='red'
          icon={<Trash size={14} />}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            confirmDelete(folder)
          }}
        >
          Delete
        </Menu.Item>
      </Menu>
    )
  }

  if (loading) {
    return <LineWobble size={246} lineWeight={5} speed={1.75} color='black' />
  }
  if (error) {
    return <div>Error</div>
  }
  return (
    <>
      <Stack spacing={4}>
        <Group>
          <Title className='uppercase flex-1 py-1 text-sm rounded text-gray-500 dark:text-gray-100'>
            folder
          </Title>
          <Plus size={16} className='cursor-pointer' onClick={open} />
        </Group>
        {folderList.map((tag: Folder) => {
          return (
            <SidebarNavItem
              className='pl-2'
              key={tag.id}
              item={tag}
              icon={<Folders size={18} />}
              rightSection={rightSection(tag)}
            />
          )
        })}
      </Stack>
      <Modal
        opened={visible}
        centered
        onClose={dismiss}
        withCloseButton={false}
      >
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              placeholder='awesome folder name'
              icon={<Folder size={12} />}
              defaultValue={defaultFolderName}
              required
              label='Folder Name'
              ref={textInputRef}
            />
            <Group className='flex justify-end'>
              <Button color='red' onClick={dismiss}>
                Cancel
              </Button>
              <Button className='btn btn-primary' color='green' type='submit'>
                Create
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  )
}
