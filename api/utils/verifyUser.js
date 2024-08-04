const errorHandler = require("../utils/errorHandler");
const jwt = require('jsonwebtoken');

const verifyToken=(req,res,next)=>{

    const token = req.cookies.access_token;
    if(!token){
        return next(errorHandler(401,"Erro while updating || Unauthorized user"))
    } 
    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err)return next(errorHandler(403,"forbidden"))
        
        req.user=user;
        next();
    })


}
module.exports =verifyToken