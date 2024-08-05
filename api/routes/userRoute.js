const express = require('express');
const {test,updateUser,deleteUser,getlistings} = require('../controller/userController');
const verifyToken = require('../utils/verifyUser');
// const updateUser = require('../controller/userController')

const router = express.Router();


router.get('/test', test);
router.post('/update/:id',verifyToken,updateUser);
router.delete('/delete/:id',verifyToken,deleteUser);
router.get('/listings/:id',verifyToken,getlistings)
module.exports=router;


