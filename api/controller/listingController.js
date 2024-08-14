const Listing = require('../models/listingModel');
const errorHandler = require('../utils/errorHandler');



const createListing=async(req,res,next)=>{

    try{
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);

    }catch(error){
        next(error)
    }
    


}
const deleteListing = async(req,res,next)=>{
    
        const deleteListing = await Listing.findById(req.params.id);
        if(!deleteListing){
            return next(errorHandler(401,"Listing not found"))
        }
        if(req.user.id !== deleteListing.userRef){
            return next(errorHandler(401,"You can delete Your own listings,,,,"))
        }

    try{
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json("Your listing deleted successfully")

    }catch(error){
        next(error)
    }
}
const updateListing = async(req,res,next)=>{
    const updateListing = await Listing.findById(req.params.id);
    if(!updateListing){
        return next(errorHandler(401,"Listing not found"));

    }
    if(req.user.id !== updateListing.userRef){
        return next(errorHandler(401,"you can update only your own listings"));
    }
    try{
        await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,{new:true}
        )
        res.status(200).json()
    }catch(error){
        next(error);
    }

}
const getListing=async(req,res,next)=>{

    try{
         const listing = await Listing.findById(req.params.id);
        res.status(200).json(listing)
    }
    catch(error){
        next(error)
    }

}


const getListings= async(req,res,next)=>{

    try{

        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;

        if(offer ===undefined || offer==="false"){ 
            offer = {$in : [false,true] };
        }

        let furnished = req.query.furnished;
        if(furnished ===undefined|| furnished ==="false"){
            furnished = {$in : [false,true]};
        }
        let parking= req.query.parking;
        if(parking === undefined || parking==="false"){
            parking = {$in: [false,true]};
        }

        let type = req.query.type;
        if(type===undefined || type==="false"){
            type = {$in: ["rent","sale"]}
        }

        const searchTerm = req.query.searchTerm || "";
        const sort = req.query.sort || "createdAt";
        const order = req.query.order || "desc";


        const listings  =  await Listing.find({
            name :{$regex:searchTerm, $options:"i"},
            offer,
            parking,
            furnished,
            type,
        }).sort({[sort]:order}).limit().skip(startIndex);

   return res.status(200).json(listings);
    }catch(error){
        console.log(error);
    }

}

module.exports = {createListing,deleteListing,updateListing,getListing,getListings}