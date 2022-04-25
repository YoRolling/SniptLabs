import Sidebar from '@/components/Layout/Sidebar'
import { Outlet } from 'react-router-dom'
// import Toolbar from './Toolbar'
export default function Layout() {
  return (
    <div className='h-full flex flex-col border-1 border-left-0 border-right-0 border-bottom-0 divide-y divide-current'>
      <div className='flex overflow-hidden'>
        <Sidebar />
        <div className='flex-1 overflow-hidden'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
