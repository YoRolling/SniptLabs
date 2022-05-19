import { UnstyledButton } from '@mantine/core'
import { useReducerAtom } from 'jotai/utils'
import { navFilterAtom, navFilterReducer } from '@/store/NavFilter'
import React, { useMemo } from 'react'

export default function SidebarNavItem({
  item,
  icon,
  className,
  rightSection,
}: {
  item: Folder
  icon?: React.ReactNode
  baseUrl?: string
  className?: React.HTMLAttributes<HTMLButtonElement>['className']
  rightSection?: React.ReactNode
}) {
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
  }
  return (
    <UnstyledButton
      component='div'
      className={`flex items-center gap-4px px-2 py-1 text-xs rounded no-underline w-full text-gray-500 dark:text-gray-100 ${className} ${activeClass}`}
      sx={(theme) => ({
        '&.active,&:hover': {
          color: '#FFF',
          backgroundColor: theme.colors.indigo['4'],
        },
      })}
      onClick={toggleFilter}
    >
      <UnstyledButton className='flex flex-1 items-center text-xs gap-4px text-current'>
        {icon}
        {item.name}
      </UnstyledButton>
      {rightSection}
    </UnstyledButton>
  )
}
