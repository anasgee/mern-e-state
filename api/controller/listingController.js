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

module.exports = {createListing,deleteListing}