const mongoose = require('mongoose');


const deviceSchema = new mongoose.Schema({

    device:             {type: String,  required: true},
    os:                 {type: String,  required: true},
    manufacturer:       {type: String,  required: true},
    lastCheckedOutDate: {type: Date,    required: true, default: Date.now},
    lastCheckedOutBy:   {type: String,  required: false},
    isCheckedOut:       {type: Boolean, required: true, default: false},
    feedback:           {type: String,  required: false},
    chekoutPeriod:      {type: String,  required: false}    
});

module.exports = mongoose.model('Device',deviceSchema);