import React,{useState} from 'react'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {


  const [formData,setFormData]= useState({  });
  const [error, setError] = useState(null);
  const [loading,setLoading]= useState(false)
  const navigate = useNavigate()

  const handleChange =(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    })
    console.log(formData)
  }
const handleSubmit =async(e)=>{
  e.preventDefault();
  try{
  setLoading(true)
  const res = await fetch("/api/auth/signup",{
    method:"POST",
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify(formData),
  });
  
  const data=await res.json();
  if(data.success === false ){
    setLoading(false);
    setError(data.message);
    return;
  }
  setLoading(false);
  setError(null);
  navigate('/signin');
}catch(err){
  setLoading(false);
  setError(err.message)
}
}


  return (
    <div className='max-w-lg mx-auto p-5 '>
      <h1 className='text-center my-10 text-3xl font-semibold'>Sign Up</h1>
      <form action="" className='flex flex-col gap-4 shadow-xl p-2 ' >
        <input onChange={handleChange} className='p-3 border rounded-lg shadow-xl' type="text" placeholder='User Name' id='username' />
        <input onChange={handleChange} className='p-3 border rounded-lg shadow-xl' type="email" placeholder='Email' id='email' />
        <input onChange={handleChange} className='p-3 border rounded-lg shadow-xl' type="password" placeholder='Password' id='password'/>
        <button  onClick={handleSubmit}  className='bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-80'>{loading ? 'loading....':"sign up"}</button>
      
      </form>
      <p className='mt-5 text-red-900 font-bold'>{error}</p>
       <div className='flex gap-3  mt-10 ' >
        <p>Have an Account?</p>
       <NavLink to='/signin'> <span className='underline text-red-900 font-semibold'>Sign In</span></NavLink>
       </div>
    </div>
  )
}

export default SignUp;