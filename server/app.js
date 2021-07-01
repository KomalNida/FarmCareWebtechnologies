const dotenv = require("dotenv");
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authentication = require('./router/authentication')
const Farmer = require('./router/farmer');
const Animal = require('./router/animal');
const Event = require('./router/animalEvent');
const Prescription = require('./router/prescription');
var cors = require('cors');


// db connection

mongoose.connect("mongodb://localhost:27017/webFarmcare", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}, () => console.log('connected to db'))

app.use(express.json());
// app.use(cookieParser());
app.use(cors());

//routers  


app.use('/auth', authentication);
app.use('/farmer', Farmer);
app.use('/animal', Animal);
app.use('/event', Event);
app.use('/prescription', Prescription);



app.listen(5000, () => console.log("SERVER RUNNING on 5000"))