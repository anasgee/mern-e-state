import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

const Contact = ({listing}) => {
  const [userData,setUserData]=  useState(null);
  const [message,setMessage] = useState('');

// console.log(message);

const handleChange=(e)=>{
  setMessage(e.target.value);
  
}
 
    // console.log(listing);



    useEffect(()=>{
    
     try{
      const getUserData= async()=>{
        const res = await fetch(`/api/user/${listing.userRef}`);
       const data = await res.json(res);
        console.log(data);
       setUserData(data);
    }
    getUserData();
     }catch(error){
      console.log(error)
     }

    },[listing.userRef]);
  return (
    
    <div className='d-flex flex-col p-3 mt-3'>
    {  userData &&
     <p className='mb-2 '>Contact <span className='text-red-700'>@{userData.username} </span> For {listing.name} </p>
}
        <textarea className='w-full p-3 rounded-lg' onChange={handleChange} name="" placeholder='Enter Message Here' id="message"></textarea>
{ userData &&
        <NavLink value={message} to={`mailto:${userData.email}?subject= Regarding ${listing.name}&body=${message}`} className='text-center w-full bg-slate-700 text-white mt-2 p-3 rounded'>Send Message</NavLink>
      }
        </div>
  )
}

export default Contact;
