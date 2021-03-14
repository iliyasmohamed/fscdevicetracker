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
//Edge cases handled in this module:
    //Indicate if a device has been checked out for more than a week
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
//Edge cases handled in this module:
    //logic to add only 10 devices and the system  prevent adding more
    //Max number of allowed in the garage is 10, the system should prevent adding more.
router.post('/', async(req,res) => 
{
    const number = await Device.countDocuments();
        
    if(number < 10)
    {
        const device = new Device
        (
            {
                device: req.body.device,
                os: req.body.os,
                manufacturer: req.body.manufacturer,
            }
        )
        try
        {
            const a1 =  await device.save() 
            res.json(a1)
        }catch(err)
        {
            res.send('Error')
        }
    }
    else
    {
        res.send('Max number of devices reached')
    }
})


//module to check-in/check-out devices
//Edge cases handled in this module:
    //allows checkouts can only be performed between 9:00am - 17:00pm 
    //validates a device that's already checked out
    //Each person can only check out one device at a time.
router.patch('/:id',async(req,res)=> {
    try{
        const device = await Device.findById(req.params.id);
        var date = new Date();
        const current_hour = date.getHours();
        
        var doesUserExist = false;
        
        if(req.body.lastCheckedOutBy != null)
        {
            doesUserExist = await Device.exists({lastCheckedOutBy: req.body.lastCheckedOutBy},{isCheckedOut:true});
        }
        
        if(device.isCheckedOut == true && req.body.isCheckedOut == true)
        {res.send('Device already checked out');}

        if(doesUserExist == true)
        {res.send('Each person can only check out one device at a time.');}
        if (req.body.isCheckedOut == 'false' || (current_hour >= 9 && current_hour < 17))
        {
                    if (req.body.os != null)                 { device.os = req.body.os                                  }   
                    if (req.body.device != null)             { device.device = req.body.device                          }
                    if (req.body.feedback != null)           { device.feedback = req.body.feedback                      }
                    if (req.body.manufacturer != null)       { device.manufacturer = req.body.manufacturer              }        
                    if (req.body.isCheckedOut != null)       { device.isCheckedOut = req.body.isCheckedOut              }
                    if (req.body.lastCheckedOutBy != null)   { device.lastCheckedOutBy = req.body.lastCheckedOutBy      }
                    if (req.body.lastCheckedOutDate != null) { device.lastCheckedOutDate = req.body.lastCheckedOutDate  }
                    const a1 = await device.save();
                    res.json(a1);   
        }else
        {res.send('You are allowed to check out only between 9 am to 5 pm');
        }
    }catch(err){
        res.send('Error ' + err);
    }
})

//module to remove devices from the storage
router.delete('/:id',async(req,res)=> 
{
    try{
        const device = await Device.findById(req.params.id);
        const a1 = await device.remove();
        res.send("Record Deleted......successfully");
        
    }catch(err){
        res.send('Record Not Found');
    }
})

module.exports = router;