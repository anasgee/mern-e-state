const User  = require("../models/userModel");
const bcrypt = require('bcrypt');
const errorHandler = require("../utils/errorHandler");
const jwt = require('jsonwebtoken');


const signup =async(req, res,next)=>{

    const {username, email, password }= req.body;
    const hashPassword = bcrypt.hashSync(password,10)
    const newUser = new User({username, email,password:hashPassword});
try{
    await newUser.save();
    res.status(201).json("user created successfully");
}
catch(err){

    next(errorHandler(500,err.message))
}
}

// SignIn  module
 const signin = async(req,res,next)=>{
try{
    const {email,password} = req.body;
    const user = await User.findOne({email});
        if(!user){
            return next(errorHandler(500,"user doesn't exists"))
        }
        if(user){

            const result = bcrypt.compareSync(password,user.password)
            if(!result){
                return next(errorHandler(500,"password not match"))

            };
            const token = jwt.sign({id:user._id},process.env.SECRET_KEY);
            const {password:pass, ...rest}=user._doc;

            res.cookie('access_token',token, {httpOnly:true}).status(200).json(rest)
            // res.status(200).json("logged in successfully")
        }
}catch(err){
    next(errorHandler(500,err.message))
}
}



// Google authentication

const google=async(req,res,next)=>{
    try{
        const user= await User.findOne({email:req.body.email});
        if(user){
            const token = jwt.sign({id:user._id},process.env.SECRET_KEY);
            const {password:pass , ...rest}=user._doc;
            res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
        }
        else{
                const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-2);
                const hashedPassword = bcrypt.hashSync(generatedPassword,10);
                const newUser= await User({username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),password:hashedPassword,avatar:req.body.photo,email:req.body.email})
                await newUser.save();
                const token= jwt.sign({id:newUser._id},process.env.SECRET_KEY);
                const {password:pass,...rest}= newUser._doc;
                res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);

        }
    }          
    catch(err){
        console.log(err)
    }


}
const signout=async(req,res,next)=>{

    try{    
        res.clearCookie("access_token");
        res.status(200).json(`User ${req.user} has been logged Out successfully`);
    }catch(error){
        next(error)
    }
    
}





module.exports= {
    signup,
    signin,
    google,
    signout,
}