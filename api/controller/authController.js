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

            res.cookie('token',token, {httpOnly:true}).status(200).json(rest)
            // res.status(200).json("logged in successfully")
        }
}catch(err){
    next(errorHandler(500,err.message))
}
}







module.exports= {
    signup,
    signin,
}