import React, { useEffect, useState } from 'react'
import { NavLink, useAsyncValue } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from "swiper"
import 'swiper/css/bundle';
import { Navigation} from 'swiper/modules';
import FilterListing from './FilterListing';





const Home = () => {

const [offerListing,setOfferListing]= useState([]);
const [rentListing,setRentListing]= useState([]);
const [saleListing,setSaleListing]= useState([]);
SwiperCore.use([Navigation]);

console.log(offerListing);


  const fetchOfferListing=async()=>{

    const res = await fetch('/api/listing/getListings?offer=true&limit=4');
    const data = await res.json();
    setOfferListing(data);
  }

  const fetchRentListing=async()=>{
    const res = await fetch('/api/listing/getListings?type=rent&limit=4');
    const data = await res.json();
    setRentListing(data);
  }
  const fetchSaleListing=async()=>{
    const res = await fetch('/api/listing/getListings?type=sale&limit=4');
    const data = await res.json();
    setSaleListing(data);
  } 
  
  
  useEffect(()=>{
    fetchOfferListing();
    fetchRentListing();
    fetchSaleListing();
  
  },[])




  return (
    <main>

      <div>
           <div className='d-flex flex-col gap-3 p-28 px-3 '>
            <h1 className='text-3xl lg:text-6xl fw-bold ' > Find Your Next  <span className='text-slate-500'>Perfect</span> 
            <br /> place with ease </h1>
           <div>
           <p className='text-slate-500'>Raza Estate, find your home fast, easy and comfortable
          <br /> Our expert support team will always available for your help</p>
           </div>
           <NavLink className="text-blue-700 fw-bold" to="/search">Let's Start now...</NavLink>
           </div>



        <div className="sliderDiv py-3">


        <Swiper navigation>
            {
              offerListing && offerListing.length > 0 && offerListing.map((listing)=>(
                    <SwiperSlide>
                    <div style={{background:`url(${listing.imageURL[0]}) center no-repeat`,backgroundSize:"cover",}} className=' h-[200px] sm:h-[500px] ' alt="slider"  key={listing._id} ></div>
                </SwiperSlide>
              ))
            }
        </Swiper>
</div>

          <div className='sm:p-5' >
              <h1 className='fw-bold mt-3'>Recent Offers</h1>
              <NavLink className="text-blue-700 text-sm" to={`/search?offer=true`}>Show more offers</NavLink>
            <div className='d-flex gap-3 flex-wrap mt-3'>
              {
                offerListing && offerListing.map((listing)=>{
                return  <FilterListing key={listing._id} listing={listing} />
                })
              }
            </div>  
         
          </div>




{/* Rent */}

<div  className='sm:p-5' >
              <h1 className='fw-bold mt-3'>Houses For Rent</h1>
              <NavLink className="text-blue-700 text-sm" to={`/search?type=rent`}>Show more offers</NavLink>
            <div className='d-flex gap-3 flex-wrap mt-3'>
              {
                rentListing && rentListing.map((listing)=>{
                return  <FilterListing key={listing._id} listing={listing} />
                })
              }
            </div>  
         
          </div>



{/* Sale */}
<div  className='sm:p-5' >
              <h1 className='fw-bold mt-3'>Houses For Sale </h1>
              <NavLink className="text-blue-700 text-sm" to={`/search?type=sale`}>Show more offers</NavLink>
            <div className='d-flex gap-3 flex-wrap mt-3'>
              {
                saleListing && saleListing.map((listing)=>{
                return  <FilterListing key={listing._id} listing={listing} />
                })
              }
            </div>  
         
          </div>

      </div>
      
    </main>
  )
}

export default Home