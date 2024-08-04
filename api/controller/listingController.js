const Listing = require('../models/listingModel');



const createListing=async(req,res,next)=>{

    try{
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);

    }catch(error){
        console.log(error)
    }
    


}

module.exports = {createListing}