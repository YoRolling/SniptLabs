import { Container, Group, UnstyledButton } from '@mantine/core'
import { os, window as TauriWindow, process } from '@tauri-apps/api'
import { useEffect, useState } from 'react'
import { CircleMinus, CirclePlus, CircleX } from 'tabler-icons-react'

export default function Toolbar() {
  const [isWin, setIsWin] = useState(false)
  useEffect(() => {
    os.platform()
      .then((p) => p === 'win32')
      .then((res) => setIsWin(res))
  }, [])
  const minus = () => {
    TauriWindow.getCurrent().minimize()
  }
  const maxus = () => {
    TauriWindow.getCurrent().toggleMaximize()
  }
  const quit = () => {
    TauriWindow.getCurrent().close()
    process.exit(0)
  }
  return (
    <Container
      data-tauri-drag-region
      fluid
      className='w-full flex select-none h-60px flex-none px-4  bg-sky-50'
      sx={(theme) => ({
        borderRadius: `${theme.radius.lg}px ${theme.radius.lg}px 0 0 `,
        flexDirection: isWin ? 'row-reverse' : 'row',
      })}
    >
      <Group data-tauri-drag-region className={isWin ? 'justify-self-end' : ''}>
        <UnstyledButton onClick={minus}>
          <CircleMinus size={18} color='green' />
        </UnstyledButton>
        <UnstyledButton onClick={maxus}>
          <CirclePlus size={18} />
        </UnstyledButton>
        <UnstyledButton onClick={quit}>
          <CircleX size={18} color='red' />
        </UnstyledButton>
      </Group>
    </Container>
  )
}
