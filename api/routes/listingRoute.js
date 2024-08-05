const express = require('express');
const verifyToken = require('../utils/verifyUser');
const { createListing,deleteListing } = require('../controller/listingController');

const router = express.Router();


router.post('/create',verifyToken,createListing);
router.delete('/delete/:id',verifyToken,deleteListing)


module.exports =router;