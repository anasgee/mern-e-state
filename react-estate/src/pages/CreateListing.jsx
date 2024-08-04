import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import app from "../firebase";
import {useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";


const CreateListing = () => {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageURL: [],
        name:"",
        description:"",
        address:"",
        type:"rent",
        bathrooms:1,
        bedrooms:1,
        furnished:false,
        regularPrice:40,
        discountedPrice:0,
        parking:false,
        offer:false,



    });
    const [imageError, setImageError] = useState(false);
    const [imgLoading,setImgLoading]=useState(false);
    const[perc,setPerc]=useState(0);
    const [loading,setLoading] = useState(false);
    const [error,setError]=useState(false);
    const {currentUser} = useSelector((state)=>state.user);




    // 
    const navigate = useNavigate();
   
    console.log(formData);

    const handleSetImage = (e) => {
        if (files.length > 0 && files.length + formData.imageURL.length < 7) {
            const promises = [];
            setImgLoading(true)
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises)
                .then((urls) => {
                    // setFormData({...formData, imageURL:urls})
                    setFormData({
                        ...formData,
                        imageURL: formData.imageURL.concat(urls),
                    }); // it wil add new one to the previous one images....
                    setImageError(false);
                    setImgLoading(false)
                })
                .catch((error) => {
                    setImageError("imgae upload Failed / 2mb");
                    setImgLoading(false)
                });
        } else if (files.length < 1) {
            setImageError("Please upload at least one image");
            setImgLoading(false)
        } else {
            setImageError("you can list only 6 images at a time");
            setImgLoading(false)
        }
    };

  
    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setPerc(Math.round(progress))
                },
                (error) => {
                    reject(error);
                },

                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };
    const handleDeleteImage = (index)=>{
        setFormData({
            ...formData,
            imageURL:formData.imageURL.filter((_,i)=> i !== index)}
        )
    }

    const handleChange=(e)=>{
if(e.target.id ==="sale" || e.target.id==="rent"){
    setFormData({
        ...formData,
        type:e.target.id
    })}
    if(e.target.id==="offer" || e.target.id==="furnished" || e.target.id==="parking" ){
    setFormData({
        ...formData,
        [e.target.id]:e.target.checked
    })
    }
    if(e.target.type==="number" || e.target.type==="text" || e.target.type==="textarea"){
        setFormData({
            ...formData,
            [e.target.id]:e.target.value
        })
    }
    }
    const handleFormSubmit = async(e)=>{
        e.preventDefault();

        try{
            setLoading(true);
            setError(false);
            if(formData.imageURL.length<1){
                setError("You must upload at least one image")
                setLoading(false)
            }
            if(formData.regularPrice < formData.discountedPrice){
            setError("Discounted Price must be less than regular price");
            setLoading(false)
            }
            const res = await fetch('/api/listing/create',{
                method: "POST",
                headers:{
                    'Content-Type':"application/json",
                },
                body:JSON.stringify({...formData,
                    userRef:currentUser._id
                })} )
            const data= await res.json();
            navigate(`/listing/${data._id}`);
                setLoading(false);
            
            if(data.success===false){
                setError(data.message);
                setLoading(false)
            }
                
        }catch(error){
            setError(error)
        }
    }


    return (
        <main className=" p-3 max-w-4xl mx-auto">
            <h1 className="text-4xl fw-semibold text-center my-5">Create Listing</h1>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 sm:flex-row  p-1">
                <div className="flex flex-col  gap-4 flex-1">
                    <input
                        type="text"
                        id="name"
                        className="p-3 rounded-xl"
                        placeholder="Name"
                        onChange={handleChange}
                        value={formData.name}
                    />
                    <textarea
                        type="text"
                        id="description"
                        className="p-3 rounded-xl"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                    <input
                        type="text"
                        id="address"
                        className="p-3 rounded-xl"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <div className="flex gap-4 flex-wrap">
                        <div className="flex gap-2">
                            <input  type="checkbox" id="sale" onChange={handleChange} checked={formData.type==="sale"} />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="rent" onChange={handleChange}  checked={formData.type==="rent"}  />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="parking" onChange={handleChange}  checked={formData.parking} />
                            <span>Parking</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="furnished" onChange={handleChange}  checked={formData.furnished} />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="offer" onChange={handleChange}  checked={formData.offer} />
                            <span>Offer</span>
                        </div>

                        <div className="flex gap-4 flex-wrap">
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    id="bedrooms"
                                    min={1}
                                    max={10}
                                    className="rounded p-2  w-10"
                                    onChange={handleChange}
                                    value={formData.bedrooms}
                                />
                                <p>Beds</p>
                            </div> 
                            <div className="flex gap-2  items-center gap-2">
                                <input
                                    type="number"
                                    id="bathrooms"
                                    min={1}
                                    max={10}
                                    className="rounded p-2 w-10"
                                    onChange={handleChange}
                                    value={formData.bathrooms}
                                />
                                <p>Baths</p>
                            </div>
                            <div className="flex gap-2  items-center gap-2">
                                <input
                                    type="number"
                                    id="regularPrice"
                                    min={40}
                                    max={3000}
                                    className="rounded p-2"
                                    onChange={handleChange}
                                    value={formData.regularPrice}
                                />
                                <div>
                                    <p>Regular Price</p>
                                    <span className="text-gray-400">($ / month)</span>
                                </div>
                            </div>
                      {
                        formData.offer && (<div className="flex gap-2  items-center gap-2">
                            <input
                                type="number"
                                id="discountedPrice"
                                min={0}
                                max={3000}
                                className="rounded p-2"
                                onChange={handleChange}
                                value={formData.discountedPrice}/>
                            <div>
                                <p>Discounted Price</p>
                                <span className="text-gray-400">($ / month)</span>
                            </div>
                        </div>)

                      }
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                    <p className="fw-bolder">
             
                        Images:
                        <span className="fw-lighter text-gray-500">
                            The First Image will be the cover(max-6)
                        </span>
                    </p>
                    <div className="mt-2 flex gap-2 flex-col sm:flex-row">
                        <input
                            onChange={(e) => setFiles(e.target.files)}
                            className="border-gray-400 border p-2 cursor-pointer"
                            type="file"
                            id="images"
                            accept="image/*"
                            multiple
                        />
                        <button
                            onClick={handleSetImage}
                            type="button"
                            className="border-green border border-green-700 p-2 w-full text-green-700 hover:text-yellow-600 hover:border-red-700"
                        >
                            {imgLoading ? `${perc} %` :"Upload"}
                        </button>
                    </div>
                    <p className="text-red-700 text-sm">{imageError && imageError}</p>
                  

                    {formData.imageURL.length > 0 &&
                        formData.imageURL.map((url,index) => (<div  key={url} className="flex justify-between p-3">
                                  <img
                                    src={url}
                                    alt="Listing Image"
                                    className="w-20 h-20 object-contain rounded-lg"
                                />
                                <button onClick={()=>handleDeleteImage(index)} className="text-red-700"> Delete</button>
                            </div>
                   ) )}
                    <button disabled={loading || imgLoading} type="submit" className="disabled:opacity-70 bg-slate-700 p-3 rounded-xl text-white">
                       {loading? "Loading...":"Create Listing"}
                    </button>  
                    <p className="text-red-700 text-sm">{error} </p>
                </div>
            </form>
        </main>
    );
};

export default CreateListing;
