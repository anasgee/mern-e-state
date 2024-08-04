import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import {useSelector} from "react-redux"

const Header = () => {

    const {currentUser} = useSelector((state)=>state.user)
  return (
    <>
        <header className='bg-slate-200 shadow-md'>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <NavLink to='/'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-slate-700'> Raza</span>
                <span className='text-red-900'> Estate</span>
            </h1>
            </NavLink >
            <form action="" className='bg-slate-100  p-3 rounded-lg flex  items-center'>
                <input type="text" placeholder='Search...' className='bg-transparent border-0 outline-0 w-24 sm:w-64' />
                <FaSearch className='text-slate-600'/>
            </form>
            <ul className='flex gap-4'>
              <NavLink to='/'>  <li className='hidden sm:inline text-slate-700 hover:underline hover:text-red-900 hover:cursor-pointer'>Home</li></NavLink>
              <NavLink to='about' > <li className='hidden sm:inline text-slate-700 hover:underline hover:text-red-900 hover:cursor-pointer' >About</li></NavLink>
              <NavLink to='profile'> 
             {currentUser? <img className='rounded-full w-8 h-8 object-cover' src={currentUser.avatar } alt='Profile'/>:<li className=' text-slate-700 hover:underline hover:text-red-900 hover:cursor-pointer'>Sign in</li>}
              </NavLink>
            </ul>
    </div>
        </header>
    </>
)
}

export default Header