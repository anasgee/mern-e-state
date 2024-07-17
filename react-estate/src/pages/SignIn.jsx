import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
 import {signInStart,signInFailure,signInSuccess} from "../redux/user/userSlice";

const SignIn = () => {

  const [formData,setFormData]=useState({});
  // const [error,setError]=useState(null);
  // const [loading,setLoading]=useState(false);
  const {loading,error}= useSelector((state)=>state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleChange = (e)=>{

  setFormData({
    ...formData,
    [e.target.id]:e.target.value
  })
  // console.log(formData);
}

const handleSubmit=async(e)=>{
  e.preventDefault();
  try{
    dispatch(signInStart())
  const res = await fetch('/api/auth/signin',{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(formData)
  })
  // console.log(formData)
  const data= await res.json();
  if(data.success===false){
   dispatch(signInFailure(data.message))
  }else{

    dispatch(signInSuccess(data))
    navigate('/');
  }

  }
  catch(err){
    dispatch(signInFailure(err.message))

  }

}




  return (
    <div className='max-w-xl p-5 mx-auto'> 
      <h1 className='text-center font-semibold text-2xl my-10'>Login</h1>
      <form className='flex flex-col gap-4 shadow-xl p-2 '>
          <input onChange={handleChange} className='p-3 rounded-xl shadow-xl outline-none' type="email"  placeholder='email' id='email'/>
          <input onChange={handleChange} className='p-3 rounded-xl shadow-xl outline-none' type="text"  placeholder='Password' id='password'/>
          <button onClick={handleSubmit} className='bg-slate-700 text-white p-3 rounded-xl uppercase hover:opacity-90 disabled:opacity-80'>{loading? "Loading....":"Sign In"}</button>
      </form>
      <p className='text-red-900'> {error}</p>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account ? </p>
       <NavLink to='/signup'> <p className='text-red-900 font-semibold'>SignUp</p></NavLink>
      </div>
    </div>
  )
}

export default SignIn;