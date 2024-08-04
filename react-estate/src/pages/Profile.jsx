import React, { useRef, useState ,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import app from "../firebase";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutFailure, signOutStart, signOutSuccess, updateUserFailure,updateUserStart,updateUserSuccess } from '../redux/user/userSlice';





const Profile = () => {
  const {currentUser,loading,error}= useSelector((state)=>state.user);
  const refFile=useRef(null);

  const navigate = useNavigate()
const [file,setFile]=useState(undefined);
const [perc,setPerc] = useState(0);
const [fileError, setFileError]= useState(false);
const [formData,setFormData] = useState({});
//________________________________________________________________-   Modal Start
const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

// Modal 2 signout

const [modal2show, setShowModal2] = useState(false);
 const handleClose2 = ()=> setShowModal2(false)
  const handleShow2 = () => setShowModal2(true);


//__________________________________________________________________Modal End
console.log(formData);
const dispatch = useDispatch();
// console.log(perc);
// console.log(fileError);
// console.log(file);




  // const signOutHandle=()=>{
  //   currentUser.initaialState=null;
  //   navigate('/signin')
  // }
  // console.log(currentUser);

  const signOutHandle = async()=>{
    
    try{
      dispatch(signOutStart());

      const response = await fetch('/api/auth/signout');
      const data=await response.json();

      if(data.success ===false){
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess(data));
    }
    catch(error){
      dispatch(signOutFailure())
    }



  }
  // console.log(currentUser);


  // Upload image functionality to firebase storage
 const handleSetImage =async(file)=>{
  const storage  =getStorage(app);    //first step is to get storage
  const fileName = new Date().getTime()+file.name;  //set file name to the required format
  const storageRef= ref(storage, fileName);  // create storage ref by ref function in the firebase
  const uploadTask  = uploadBytesResumable(storageRef,file); //create task variable by uploadBytesResumeable

  uploadTask.on('state_changed',(snapshot)=>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setPerc(Math.round(progress))
  },
  (error)=>{
    setFileError(true);
  },
  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((downlaodURL)=>{
      setFormData({...formData, avatar:downlaodURL})

    })
  }
)



 }
      
  // }
  // )
  

const handleFormChange=(e)=>{
setFormData({...formData, [e.target.id] : e.target.value})
// setFormData({ [e.target.id] : e.target.value})
}

const handleFormSubmit =async(e)=>{
    e.preventDefault();   
try{
  dispatch(updateUserStart());
  const response = await fetch(`/api/user/update/${currentUser._id}`,{
    method:"POST",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(formData),

  });
  const data= response.json();
  if(data.success === false){
    dispatch(updateUserFailure(data.message));
    return;
  }
  dispatch(updateUserSuccess(data));
}
catch(error){
  dispatch(updateUserFailure(error.message));
}
}

const handleDeleteUser=async()=>{
  try{
      dispatch(deleteUserStart());
      const res= await fetch(`/api/user/delete/${currentUser._id}`,{
        method:"DELETE",

      });
      const data=await res.json();
      if(data.success===false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate('/signin');
  }
  catch(error){
    console.log(error);
  }

}



  useEffect(()=>{
    if(file){
      handleSetImage(file);
    }
  },[file]);

  // const memoizedFormData = useMemo(() => formData, [formData]);

  return (
    <div className='max-w-xl p-5 mx-auto'>
      <h1 className='font-semibold text-center my-8 text-2xl'>Profile Setting</h1>
        <form onSubmit={handleFormSubmit} className='flex flex-col gap-4 shadow-xl p-2 '>
          <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={refFile} hidden accept='image/*'/>
        <img style={{width :"80px", height:"80px"}} onClick={()=>refFile.current.click()} className=' self-center  rounded cursor-pointer' src={formData.avatar || currentUser.avatar} alt="Profile Image" />
        <p className='text-center text-sm'>
          {fileError ? (<span className='text-red-700'>Error image upload! Image size should be less than 1MB</span>) : perc >0 && perc<100 ? (<span className='text-orange-500'>{`Uploading ${perc} %`}</span>) : perc==100? (<span className='text-green-700'>Image uploaded successfully</span>):("")
          }</p><input  onChange={handleFormChange} defaultValue={currentUser.username} type="text" className='p-3 rounded-xl' placeholder='username' id='username' />
                <input onChange={handleFormChange} defaultValue={currentUser.email}  type="email" className='p-3 rounded-xl' placeholder='email' id="email" />
                <input  onChange={handleFormChange}  type="password" className='p-3 rounded-xl' placeholder='password' id='password' />
                <button   type='submit' className='bg-slate-700 text-white p-3 rounded-xl'>{loading? "Loading . . .":"Update  "}</button>
                <NavLink to='/createListing' className='bg-green-700 text-white p-3 rounded-xl text-center'>
                Create Listing
                </NavLink>
        </form>
        <div className='text-red-800 font-semibold flex justify-between p-4'>
          {/* <p onClick={handleDeleteUser}>Delete Account</p> */}
          <p className='cursor-pointer '  onClick={handleShow}>Delete Account</p>
         
          <p className='cursor-pointer' onClick={handleShow2}>Sign Out</p>
        </div>
        {/* ------------------------------------------------ Modal --------------*/}
        <Modal  show={show} onHide={handleClose} centered  >
          <div style={{background:" rgb(241,245,241)"}} className='rounded-2'>
        <Modal.Header closeButton>
          <Modal.Title>Caution</Modal.Title>
        </Modal.Header>
        <Modal.Body >By Clicking on Continue, Your Account will permanently Deleted</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger"  onClick={handleDeleteUser}>
            Continue
          </Button>
        </Modal.Footer>
        </div>
      </Modal>

      {/* modal 2 */}
      <Modal  show={modal2show} onHide={handleClose2} centered  >
          <div style={{background:" rgb(241,245,241)"}} className='rounded-2'>
        <Modal.Header closeButton>
          <Modal.Title>Caution</Modal.Title>
        </Modal.Header>
        <Modal.Body >are you sure to logOut?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="danger" onClick={signOutHandle}>
            Continue
          </Button>
        </Modal.Footer>
        </div>
      </Modal>
      {/* modal 2 end */}
        {/* ------------------------------------------------ Modal End ----------*/}
    </div>
  )
}

export default Profile