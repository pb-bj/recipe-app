import React, { useEffect } from 'react'
import UserIcon from '../assets/user.png'
import { MenuItems } from '../Data'
import { Link } from 'react-router-dom'
import hideSidebar from '../assets/hide.png'
import showSidebar from '../assets/show.png'

type SidebarProps = {
  hiddenSidebar: boolean
  triggerSidebar: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ hiddenSidebar, triggerSidebar }) => {
  useEffect(() => {
    console.log(hiddenSidebar)
  }, [hiddenSidebar])

  return (
    <div
      className={`
        flex flex-col h-full bg-white transition-all duration-300 ease-in-out
        ${hiddenSidebar ? 'px-2' : 'px-4'}
      `}
    >
      {/* Toggle Button */}
      <div className={`flex mt-2 ${hiddenSidebar ? 'justify-center' : 'justify-end'}`}>
        <button onClick={triggerSidebar}>
          <img
            src={hiddenSidebar ? showSidebar: hideSidebar}
            alt="toggle sidebar"
            className="w-6 cursor-pointer"
          />
        </button>
      </div>

      {/* User Info */}
      <div className="flex items-center justify-center gap-3 my-6 transition-all duration-300">
        <img src={UserIcon} alt="user" className="h-10 w-10 object-cover rounded-full" />
        <div
          className={`
            transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap
            ${hiddenSidebar ? 'hidden' : 'block'}
          `}
        >
          <p className="text-sm font-semibold">Ronil Shakya</p>
          <p className="text-xs text-gray-500">Plan: Free</p>
        </div>
      </div>

      {/* Navigation */}
      <div className={`flex flex-col ${hiddenSidebar ? 'gap-0' : 'gap-4'}`}>
        {MenuItems.map((item) => (
          <div key={item.id}>
            <h3
              className={`
                text-xs uppercase font-bold text-gray-500 transition-opacity duration-300
                ${hiddenSidebar ? 'opacity-0 h-0' : 'opacity-100 h-auto'}
              `}
            >
              {item.title}
            </h3>

            <ul className={`${hiddenSidebar ? 'mt-0':'mt-2'} space-y-2`}>
              {item.menus.map((menuItem) => (
                <li key={menuItem.id} className='mb-1'>
                  <Link
                    to={menuItem.url}
                    className={`flex items-center bg-gray-100 hover:bg-gray-200 rounded-md py-3 transition 
                        ${hiddenSidebar ? 'justify-center px-3' : 'gap-3 px-3 justify-start'}`}
                  >
                      <img src={menuItem.icon} alt="icon" className="w-5 shrink-0" />
                    <span
                      className={`
                        text-sm transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap
                        ${hiddenSidebar ? 'opacity-0 w-0' : 'opacity-100 w-auto'}
                      `}
                    >
                      {menuItem.page}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
