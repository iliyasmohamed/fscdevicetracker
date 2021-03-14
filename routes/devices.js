const express = require('express');
const device = require('../models/device');
const router = express.Router();
const Device = require('../models/device');


router.get('/', async(req,res) => {
    try{
           const devices = await Device.find();
           res.json(devices);
    }catch(err){
        res.send('Error ' + err);
    }
});

module.exports = router;