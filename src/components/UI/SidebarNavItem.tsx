import { UnstyledButton } from '@mantine/core'
import { NavLink } from 'react-router-dom'

export default function SidebarNavItem({
  item,
  icon,
  baseUrl = '',
}: {
  item: Tag | Folder
  icon?: React.ReactNode
  baseUrl?: string
}) {
  return (
    // <NavLink to={`${baseUrl}${item.id}`} className='no-underline'>
    <UnstyledButton
      component={NavLink}
      to={`${baseUrl}${item.id}`}
      className='flex items-center gap-4px p-2 py-1 h-40px text-sm rounded no-underline w-full text-gray-500 dark:text-gray-100'
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
    // </NavLink>
  )
}
