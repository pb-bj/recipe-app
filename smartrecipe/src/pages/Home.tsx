import React from 'react'
import logo from '../assets/vertical logo (dark).png'
import { MenuItems } from '../Data'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home-cover bg-amber-900 h-full flex flex-col items-center'>
      <img src={logo} alt="logo" className='w-32'/>
      {
        MenuItems
          .filter(item => item.title === 'Recipes')
          .map((item)=>(
            <ul className='grid grid-cols-1 md:grid-cols-3 mt-10'>
              {item.menus.map((menuItem)=>(
                <li className='w-56'>
                  <Link to={menuItem.url} className='p-4 bg-white/70 m-2 flex justify-between gap-8'>
                    {menuItem.page}
                    <img src={menuItem.icon} alt="" className='w-6' />
                  </Link>
                </li>
              ))}
            </ul>
          ))
      }
    </div>
  )
}

export default Home