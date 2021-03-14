const express = require('express');
const device = require('../models/device');
const router = express.Router();
const Device = require('../models/device');


//in this module: displaying list of devices available in storage
router.get('/', async(req,res) => {
    try{
           const devices = await Device.find();
           res.json(devices);
    }catch(err){
        res.send('Error ' + err);
    }
});


//in this module: displaying specific devices available in storage by their ID
router.get('/:id', async(req,res) => {
    try{
           const device = await Device.findById(req.params.id);
           const today_date = new Date();           
           
           //calculating if a deivce has been checked out for more than a week
           const calc_chkoutmorethan7days = today_date - device.lastCheckedOutDate;
           
           //converting milliseconds to days
           const millisectoday = 604800000;
                      if(calc_chkoutmorethan7days > millisectoday){
                        device.chekoutPeriod = 'Device checkedout for more than 7 days';
                        const a1 = await device.save();
                        res.json(a1); 
                    }           
        if (device != null){
           res.json(device);
        }else{
            res.send('Device Not Found');
        }
    }catch(err){
        res.send('Device Not Found');
    }
});

//module to add devices to the storage
//logic to add only 10 devices and the system  prevent adding more
router.post('/', async(req,res) => 
{
    const number = await Device.countDocuments();
        
    if(number < 10)
    {
        const device = new Device;
        (
            {
                device: req.body.device,
                os: req.body.os,
                manufacturer: req.body.manufacturer,
            }
        )
        try
        {
            const a1 =  await device.save();
            res.json(a1);
        }catch(err)
        {
            res.send('Error');
        }
    }
    else
    {
        res.send('Max number of devices reached');
    }
})

module.exports = router;