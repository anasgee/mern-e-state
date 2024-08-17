import { FaLocationDot } from "react-icons/fa6";

import React from 'react'
import { NavLink } from 'react-router-dom'

const FilterListing = ({listing}) => {
  return (
    <div  className=' items-center overflow-hidden w-full sm:w-[300px] bg-white shadow-2xl p-2 rounded'>
        <NavLink to={`/listing/${listing._id}` }className="d-flex flex-col gap-3" >
           <img className='w-full sm:w-[300px] sm:h-[200px] transition-scale hover:scale-105 duration-300' src={listing.imageURL[0]} alt="listing image" />
            <div className="d-flex flex-col gap-2">
            <p className="line-clamp-1 fw-bold">{listing.name} </p>
            <div className="d-flex items-center gap-2">
                    <FaLocationDot className="text-green-700"/>
                    <p>{listing.address} </p>
            </div>
            <p className="line-clamp-2">{listing.description} </p>
            <p className="fw-bold text-green-700">
                ${listing.offer? listing.discountedPrice.toLocaleString("en-US") :listing.regularPrice.toLocaleString("en-US")}
                {listing.type ==="rent" && "/month"}

            </p>
            <div className="d-flex gap-2">
                <p className="fw-bold">
                {listing.bedrooms && listing.bedrooms>1?  `${listing.bedrooms}beds`:`${listing.bedrooms}bed`}
                </p>
                <p className="fw-bold">
                {listing.bathrooms && listing.bathrooms>1?  `${listing.bathrooms}baths`:`${listing.bathrooms}bath`}

                </p>
            </div>
            </div>
        
        </NavLink>
    </div>
  )
}


export default FilterListing;