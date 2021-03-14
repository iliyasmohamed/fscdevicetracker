const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/GarageDB';

const app = express();

mongoose.connect(url, {useNewUrlParser:true});
const con = mongoose.connection;

con.on('open', () => {
    console.log('*** DB Connected***');
});

app.use(express.json());

const deviceRouter = require('./routes/devices');
app.use('/devices',deviceRouter);

app.listen(8080, () => {
    console.log('***Server started @ port:8080***');
});