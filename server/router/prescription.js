const express = require('express');
const router = express.Router();
const Prescription = require('../model/Prescription');


/* GET Operations */

//Farmer Dashboard
router.get('/', function (req, res, next) {
    

});


//add event 
router.post('/addprescription', async (req, res) => {


   const {  presc_description,presc_date,diagnosed_disease,medicineName, treatedBy,animal_id }= req.body;

    try {
       
            const event =  new Prescription (req.body);
            const savedEvent = await event.save();
            res.send(savedEvent);
       }
        catch (error) {
            res.send(error);
        };

});

//View all animals 

router.get('/viewprescription', async (req, res) => {

    Prescription.find().exec(function (error, result, next) {
        if (error) return next(error);
        res.json(result);
    });

});

//serach prescription by name 

router.get('/viewprescription/:name', async (req, res) => {
    Prescription.find({
        animal_id: req.params.name
    }).exec(function (error, result, next) {
        if (error) return next(error);
        res.json(result);
        
    });

});

//serach prescription by id 

router.get('/viewevent/:id', async (req, res) => {
    Prescription.find({
        _id: req.params.id
    }).exec(function (error, result, next) {
        if (error) return next(error);
        res.json(result);
    });

});




module.exports = router;