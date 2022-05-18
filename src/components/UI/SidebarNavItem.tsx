import { UnstyledButton } from '@mantine/core'
import { useReducerAtom } from 'jotai/utils'
import { navFilterAtom, navFilterReducer } from '@/store/NavFilter'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
export default function SidebarNavItem({
  item,
  icon,
  className,
}: {
  item: Tag | Folder
  icon?: React.ReactNode
  baseUrl?: string
  className?: React.HTMLAttributes<HTMLButtonElement>['className']
}) {
  const navigation = useNavigate()
  const [filter, setFilter] = useReducerAtom(navFilterAtom, navFilterReducer)
  const activeClass = useMemo(() => {
    const { type, params: { id } = {} } = filter
    return item.id === type ? 'active' : id === item.id ? 'active' : ''
  }, [filter, item.id])
  const toggleFilter = () => {
    let payload: NavFilter = {} as NavFilter
    if (!item) {
      return
    }
    const { id } = item
    if (!id) {
      return
    }
    if (['inbox', 'pinned'].includes(id)) {
      payload = {
        type: item.id as NavFilterType,
      }
    } else {
      payload = {
        type: 'folder',
        params: {
          id: id,
        },
      }
    }

    setFilter(payload)
    // navigation('/')
  }
  return (
    <UnstyledButton
      onClick={toggleFilter}
      className={`flex items-center gap-4px p-2 text-xs rounded no-underline w-full text-gray-500 dark:text-gray-100 ${className} ${activeClass}`}
      sx={(theme) => ({
        '&.active,&:hover': {
          color: '#FFF',
          backgroundColor: theme.colors.indigo['4'],
        },
      })}
    >
      {icon}
      {item.name}
    </UnstyledButton>
  )
}
