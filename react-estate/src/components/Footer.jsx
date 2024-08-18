import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div >
      
<footer class="  shadow bg-slate-200 shadow-md absolute w-full ">
    <div class="w-full mx-auto max-w-xl  p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm  sm:text-center">© 2024 <a href="https://www.github.com/anasgee" class="hover:underline">AnasGee</a>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap gap-2 items-center text-sm font-medium sm:mt-0">
        <li>
            <NavLink to={"/"} class="hover:underline me-4 md:me-6">Home</NavLink>
        </li>
        <li>
            <NavLink to={"/about"} class="hover:underline me-4 md:me-6">About</NavLink>
        </li>
      
       
       
        
    </ul>
    </div>
</footer>

    </div>
  )
}

export default Footer