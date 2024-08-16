import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import FilterListing from './FilterListing';


const Search = () => {

    const navigate = useNavigate();
    const[ loading,setLoading]= useState(false);
    const[listing,setListing] = useState([]);
    console.log(listing)
    const [searchData,setSearchData] =useState({
        searchTerm:"",
        type :"all",
        offer:false,
        parking:false,
        furnished:false,
        sort:"createdAt",
        order:"desc"
    })



    useEffect(()=>{
   
        const urlParams = new URLSearchParams(location.search);
        const searchTermURL = urlParams.get("searchTerm");
        const typeURL = urlParams.get("type");
        const offerURL = urlParams.get("offer");
        const parkingURL = urlParams.get("parking");
        const furnishedURL = urlParams.get("furnished")
        const orderURL = urlParams.get("order");
        const sortURL = urlParams.get("sort");


        if(searchTermURL || typeURL || offerURL || parkingURL || furnishedURL ||orderURL||sortURL){
            setSearchData({
                searchTerm:searchTermURL||"",
                type:typeURL || "all",
                offer : offerURL === "true"? true:false,
                parking : parkingURL ==="true"? true:false,
                furnished : furnishedURL ==="true"? true:false,
                order:orderURL || "desc",
                sort : sortURL || "created_at",
            })
        }


        const getData = async()=>{
          try{
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/getListings?${searchQuery}`);
            const data = await res.json();
         
            setListing(data);
            setLoading(false);
           }catch(error){
                setLoading(false);
                // console.log(error);
             }
        }
        getData();

},[location.search])


    // console.log(searchData);
    const handleChange=(e)=>{
        if(e.target.id==="searchTerm"){
            setSearchData({...searchData,searchTerm:e.target.value})
        }
        if(e.target.id ==="all" || e.target.id==="rent" || e.target.id==="sale"){
            setSearchData({...searchData,type:e.target.id})
        }
        if(e.target.id==="offer" || e.target.id==="parking" || e.target.id==="furnished"){
            setSearchData({...searchData,[e.target.id]:e.target.checked || e.target.checked ==="true"? true:false })
        }
        if(e.target.id==="sort_order"){
            const sort =  e.target.value.split("_")[0] || "created_at";
            const order = e.target.value.split("_")[1] || "desc";

            setSearchData({...searchData, sort,order});
        }
    }



    const handleSubmit= (e)=>{
        e.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm',searchData.searchTerm);
        urlParams.set('type',searchData.type);
        urlParams.set('offer',searchData.offer);
        urlParams.set('parking',searchData.parking);
        urlParams.set('furnished',searchData.furnished);
        urlParams.set('order',searchData.order);
        urlParams.set('sort',searchData.sort);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }


  return (
    <div className=' d-flex flex-col md:flex-row gap-3 '>
        <div  className='w-auto md:max-w-[500px] md:min-h-screen  border-b-2 md:border-r-2 md:border-b-0 p-4 h-auto    '>
           
           <form onSubmit={handleSubmit}>
            <div className='d-flex gap-3 items-center'>
               <label className='fw-semibold md:text-xl' htmlFor="">Sarch Term:</label>
               <input onChange={handleChange} value={searchData.searchTerm} className='p-3 rounded-xl md:w-auto ' placeholder='Search Here' type="search" id='searchTerm'/>
            </div>
            <div className='d-flex gap-3 mt-4 items-center flex-wrap'>
                <label className='fw-semibold md:text-xl' htmlFor="">Type: </label>
                <div className='d-flex gap-2'> 
                    <input onChange={handleChange} checked={searchData.type==="all"} className='md:w-5' type="checkbox" id='all' />
                    <span  className='fw-semibold'>Rent & Sale</span>
                </div>
                <div className='d-flex gap-2'> 
                    <input  onChange={handleChange} checked={searchData.type==="rent"}  className='md:w-5' type="checkbox" id='rent' />
                    <span className='fw-semibold'>Rent </span>
                </div>
                <div className='d-flex gap-2'> 
                    <input  onChange={handleChange} checked={searchData.type==="sale"}  className='md:w-5' type="checkbox" id='sale' />
                    <span className='fw-semibold'>Sale</span>
                </div>
                <div className='d-flex gap-2'> 
                    <input  onChange={handleChange} checked={searchData.offer}  className='md:w-5' type="checkbox" id='offer' />
                    <span className='fw-semibold'>Offer</span>
                </div>
            </div>
            <div className='d-flex gap-3 mt-4 items-center flex-wrap'>
                <label className='fw-semibold md:text-xl' htmlFor="">Amenities: </label>
                <div className='d-flex gap-2'> 
                    <input onChange={handleChange} checked={searchData.parking}  className='md:w-5' type="checkbox" id='parking' />
                    <span className='fw-semibold'>Parking</span>
                </div>
                <div className='d-flex gap-2'> 
                    <input onChange={handleChange} checked={searchData.furnished}  className='md:w-5' type="checkbox" id='furnished' />
                    <span className='fw-semibold'>Furnished </span>
                </div>
               
                
            </div>
            <div className="d-flex gap-3 mt-4 items-center">
                <label className='fw-semibold md:text-xl' htmlFor="">Sort:</label>
                <select className='p-3 border-3 rounded-xl' name="" onChange={handleChange} defaultValue={`created_at_desc`} id="sort_order">
                    <option value="regularPrice_desc">High to Low</option>
                    <option value="regularPrice_asc">Low to High</option>
                    <option value="createdAt_desc">Latest</option>
                    <option value="createdAt_asc">Older</option>
                </select>
            </div>
            <button className='bg-slate-700 text-white w-full p-3 rounded-xl mt-5 uppercase'>
                Search
               </button>
               </form>
        </div>
        <div className='p-4'>
                <h1 className='text-center fw-bolder text-3xl pb-5 mt-3'>
                    {
                        !loading && listing.length===0? "Listing Not Found":"Your Listings" 
                    } 
</h1>
{loading && <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />}

    
    <div className='d-flex flex-wrap gap-4'>
        
  {!loading && listing && listing.map((listing)=><FilterListing key={listing._id} listing = {listing} />)}
  </div>
        </div>

    </div>
  )
}

export default Search;