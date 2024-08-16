import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Contact from "../components/Contact"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// import spinner from "../assets/spinner.gif";
import { ColorRing } from 'react-loader-spinner'
import {useSelector} from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import {FaBath, FaBed, FaChair, FaMapMarkedAlt, FaParking, FaShare} from "react-icons/fa";
import SwiperCore from "swiper"

// Import Swiper styles
// import 'swiper/css';
import 'swiper/css/bundle';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';


const Listing = () => {
    const params = useParams();

    const {currentUser} = useSelector((state)=>state.user);
   

    // useState Hooks
    const [listingData,setListingData]= useState(null);
    const [error , setError]=useState(false);
    const [loading,setLoading]= useState(false);
    const[copy,setCopied] = useState(false);
    const [contact,setContact ]  = useState(false);
    SwiperCore.use([Navigation]);
    SwiperCore.use([Pagination]);
    SwiperCore.use([Scrollbar]);


    useEffect(()=>{                    
        const fetchListing = async()=>{
            try{
                setLoading(true);
                const response = await fetch(`/api/listing/get/${params.id}`);
                const data = await response.json();
               
               if(data.success===false){
                setLoading(false);
                setError(true);
                return;
               }
               setListingData(data);
               setLoading(false);
               setError(false)
                    
            }
            catch(error){
                setError(error)
                setLoading(false);
            }
                     
        }
        fetchListing();
    },[params.id]);

  return (
   
    <div>
        <main>
         {loading && <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />}
         {/* <p>{listingData.name} </p> */}
         {error && <p>Somewhere error happening Check and solve there</p> }

         {listingData && !loading && !error && (
            <div>
            <Swiper    navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }} >
                {
                    listingData.imageURL.map((url)=><SwiperSlide key={url}>
                             <div className='h-[200px] sm:h-[500px] ' style={{background:`url(${url}) center no-repeat ` ,backgroundSize:"cover"}}>

                             </div>
                            
                        </SwiperSlide>
)
                }
            </Swiper>
<div className='p-2 max-w-4xl mx-auto'>

<FaShare
className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 p-3 text-slate-700 cursor-pointer bg-white'
onClick={()=>{
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(()=>{
        setCopied(false);
    },2000);
}}
/>
{copy && <p className='fixed top-[13%] right[1%] p-3 rounded bg-white fw-bolder text-sm z-10 right-[3%] text-red-900'> Copied to clipboard </p>}
            <h5 className='mt-6 text-2xl fw-bold'>
                {listingData.name} - ${''}
                {listingData.offer ? listingData.discountedPrice.toLocaleString('en-US'):listingData.regularPrice.toLocaleString('en-US')}
                {listingData.type==="rent" && "/month"} 
            </h5>
                <p className='d-flex gap-3 mt-2  items-center'>
                    <FaMapMarkedAlt className='text-green-700 '/>
                    {listingData.address}
                </p>
             <div className='d-flex items-center gap-3'>
                <p className='bg-red-700 w-full max-w-[200px] rounded p-2 mt-5 text-center fw-bold text-white  '>
                    {listingData.type==="rent"? "For Rent":"For Sale"}
                </p>

            {
                listingData.offer && (<p className='mt-5 bg-green-700 w-full max-w-[200px] p-2 rounded text-white fw-bold text-center '>
                ${+listingData.regularPrice - +listingData.discountedPrice} OFF
            </p>)
            }
               </div>
               
               <div className='mt-3'>
                <p>
                    <span className='fw-bolder'>Description :-</span>
                    {listingData.description}
                </p>
                <ul className='text-green-900 font-semibold text-sm d-flex gap-4 sm:gap-6 flex-wrap'>
                    <li className='d-flex gap-2 items-center whitespace-nowrap'><FaBed/>
                    { listingData.bedrooms >1 ? `${listingData.bedrooms} beds`:`${listingData.bedrooms} bed`}
                         </li>
                         <li className='d-flex gap-2 items-center whitespace-nowrap'><FaBath/>
                    { listingData.bathrooms >1 ? `${listingData.bathrooms} baths`:`${listingData.bathrooms} bath`}
                     </li>
                     <li className='d-flex gap-2 items-center whitespace-nowrap'><FaParking/>
                    { listingData.parking >1 ? ` Parking`:` No Parking`}
                     </li>
                     <li className='d-flex gap-2 items-center whitespace-nowrap'><FaChair/>
                    { listingData.furnished >1 ? ` Furnished`:` No Furnished`}
                     </li>
                   
                </ul> 
                    
                    

               </div>
                        {
                          currentUser && listingData.userRef != currentUser._id && !contact &&( <button onClick={()=>setContact(true)} className='w-full bg-slate-700 rounded-xl p-3 mt-3 text-white fw-bold uppercase hover:opacity-90'>Contact Landlord</button>
                          )
                        }

                        {contact && (<Contact listing ={listingData} />)}
            </div>
         </div>




         )
         }
         </main>
    </div>
  )
}

export default Listing  