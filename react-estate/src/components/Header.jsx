import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux"

const Header = () => {

    const {currentUser} = useSelector((state)=>state.user);
    const [searchTerm,setSearchTerm] = useState('');
    const navigate = useNavigate()

    const handleSubmit =(e)=>{
        e.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm',searchTerm);
        const searchQuery = urlParams.toString();
        // console.log(searchQuery);
        navigate(`/search?${searchQuery}`)

    }   


useEffect(()=>{
    const getURLParams =()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchURLParam = urlParams.get('searchTerm');
        setSearchTerm(searchURLParam);
    }
    getURLParams();

},[location.search])
     
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
            <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex  items-center'>
                <input 
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                type="text" placeholder='Search...' className='bg-transparent border-0 outline-0 w-24 sm:w-64' />
               <button>

                <FaSearch className='text-slate-600'/>
               </button>
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