const Listing = require("../models/listingModel");
const User = require("../models/userModel");
const errorHandler = require("../utils/errorHandler");
const bcrypt = require('bcrypt');


const test = (req, res)=>{
    res.json({
        message:"Hello World"
    })
}

const updateUser = async(req,res,next)=>{

    if(req.user.id !== req.params.id) return next(errorHandler(401,"Bhai jaan apna change kro password"))
    
    try{
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password,10) 
        }
    const updateUser=await User.findByIdAndUpdate(req.params.id,{
        $set:{
            username:req.body.username,
            password:req.body.password,
            email:req.body.email,
            avatar:req.body.avatar
        }
    },{new:true})

    const {password,...rest}=updateUser._doc;
    res.status(201).json(rest);
    } 
    catch(error){
        next(errorHandler(505,error));
    }

}


    
// Delete USer Functionality

const deleteUser = async(req,res,next)=>{
    if(req.user.id!==req.params.id) return next(errorHandler(401,"HAHAHA Ye na ho paye ga, apna delete kro account bhai saab"));

    try{
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token')
        res.status(200).json("User Deleted Successfully");
    }catch(error){
        next(errorHandler(401,error));
    }
}
const getlistings=async(req,res,next)=>{
    if(req.user.id === req.params.id){

        try{
            const listings = await Listing.find({userRef:req.params.id});
            res.status(200).json(listings);
        }catch(err){
            next(err)
        }
    }
    else{
        return next(errorHandler(401,"You can only view your own listings,"))
    }

}

module.exports = {
    test,
    updateUser,deleteUser,getlistings
};