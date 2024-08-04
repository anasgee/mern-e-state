import React from 'react'
import {GoogleAuthProvider,getAuth,signInWithPopup} from "firebase/auth"
import app from '../firebase';
import {useDispatch} from "react-redux"
import { signInStart,signInFailure,signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Oath = () => {
    const dispatch = useDispatch();
    const navigate= useNavigate()

    const handleGoogle=async(e)=>{
        e.preventDefault();
        try {
            signInStart();
            const provider =new GoogleAuthProvider();
            const auth = getAuth(app);
            const result= await signInWithPopup(auth,provider);
            // console.log(result)
            const res= await fetch('/api/auth/google',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL})
            })            

            const data = await res.json()
            dispatch(signInSuccess(data));
            navigate('/');

            // console.log(result)
        } catch (error) {
            console.log("Cannot Sign In With Google ", error);
        }
    }



  return (  <button  
    onClick={handleGoogle}
    type='button'
    className='text-white bg-red-700 p-3 rounded-xl hover:bg-red-900 disabled:bg-red-400'>Continue with Google</button>
  )
}

export default Oath