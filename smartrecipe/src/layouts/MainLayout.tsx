import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'

const MainLayout = () => {
  const [hiddenSidebar, setHiddenSidebar] = useState(false);
  const triggerSidebar = () =>{
    setHiddenSidebar(!hiddenSidebar);
  }

  return (
    <>
    <div className='flex h-screen'>
      <aside className={`overflow-y-auto overflow-x-hidden p-0.5 transition-all ease-in-out duration-300 ${hiddenSidebar? 'w-[75px]' : 'w-[400px]'}`}>
        <Sidebar hiddenSidebar={hiddenSidebar} triggerSidebar={triggerSidebar} />
      </aside>
        {/* <main className={`${hiddenSidebar? 'w-[95%]' : 'w-[80%]'} overflow-y-auto`}> */}
        <main className={`w-full overflow-y-auto`}>
            <Outlet />
        </main>
    </div>
    </>
  )
}

export default MainLayout