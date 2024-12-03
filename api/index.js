const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");

dotenv.config();

const Port = process.env.PORT || 5000; 


// Routesssssssssssssssss

const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authRoute');
const listingRoute = require('./routes/listingRoute');




app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes end
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/listing',listingRoute);

// app.use(express.static(path.join(__dirname, "./react-estate/dist")));
// app.get("*",(req,res)=>{
//     res.sendFile(path.join(__dirname,"./react-estate","dist","index.html"));
// })


// Middleware to handle errors
app.use((err, req, res, next)=>{
    const statusCode =err.statusCode || 5000;
    const message = err.message || "internal server error";
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
});

   
// connect mongodb atlas cluster with mongoose
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("MongoDB connected")).catch((err)=>{
    console.log(err)
})




// Run the server
app.listen(Port , ()=>{
    try{
        console.log(`Server is listening to the PORT ${Port}`)
    }
    catch(err){
        console.log(err)
    }
    
})