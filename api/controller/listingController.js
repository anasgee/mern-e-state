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

module.exports = {createListing,deleteListing,updateListing,getListing}