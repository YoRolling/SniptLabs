import Sidebar from '@/components/Layout/Sidebar'
import { Outlet } from 'react-router-dom'
// import Toolbar from './Toolbar'
export default function Layout() {
  return (
    <div className='h-full flex flex-col'>
      <div className='flex overflow-hidden'>
        <Sidebar />
        <div className='flex-1 overflow-hidden'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
