import { UnstyledButton } from '@mantine/core'
import { NavLink } from 'react-router-dom'

export default function SidebarNavItem() {
  return (
    <NavLink to='/'>
      <UnstyledButton>ABC</UnstyledButton>
    </NavLink>
  )
}
