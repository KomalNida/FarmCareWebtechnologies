const express = require('express');
const router = express.Router();

const AnimalEvent = require('../model/AnimalEvent');


/* GET Operations */

//Farmer Dashboard
router.get('/', function (req, res, next) {
    

});


//add event 
router.post('/addevent', async (req, res) => {
   const {  event_name,event_type,disease_symptoms,diagnosed_disease,vaccine_Name,weighed_results
            ,additional_notes,treatedBy,animal_id }= req.body;
    try {
        if(event_name,event_type,animal_id,additional_notes){
            const event =  new AnimalEvent (req.body);
            const savedEvent = await event.save();
            res.send(savedEvent);
       }
       else if(event_name,event_type,disease_symptoms,diagnosed_disease,treatedBy,animal_id,additional_notes){
           const event =  new AnimalEvent (req.body);
           const savedEvent = await event.save();
           res.send(savedEvent);
       }
       else if (event_name,event_type,vaccine_Name,treatedBy,animal_id,additional_notes){
           const event =  new AnimalEvent (req.body);
           const savedEvent = await event.save();
           res.send(savedEvent);
       }
       else if (event_name,event_type,animal_id,weighed_results,additional_notes){
           const event =  new AnimalEvent (req.body);
           const savedEvent = await event.save();
           res.send(savedEvent);
       }
               
        }
        catch (error) {
            res.send(error);
        };

});

//View all animals 

router.get('/viewevent', async (req, res) => {

    AnimalEvent.find().exec(function (error, result, next) {
        if (error) return next(error);
        res.json(result);
    });

});

//serach event by name 

router.get('/viewevent/:name', async (req, res) => {
    AnimalEvent.find({
        event_name: req.params.name
    }).exec(function (error, result, next) {
        if (error) return next(error);
        res.json(result);
        
    });

});

//serach event by id 

router.get('/viewevent/:id', async (req, res) => {
    AnimalEvent.find({
        _id: req.params.id
    }).exec(function (error, result, next) {
        if (error) return next(error);
        res.json(result);
    });

});
//Delete event by  name

router.delete('/deleteevent/:id', function (req, res, next) {
    AnimalEvent.deleteOne({
        _id: req.params.id
    }, function (error, results) {
        if (error) {
            return next(error);
        }

        res.json(results);
    });
});

//update Animal

router.put('/updateevent/:id', function (req, res, next) {
     var eventid= req.params.id;
     AnimalEvent.findOneAndUpdate({
            _id: eventid
        }, req.body, {
            new: true,
           
        },
        function (error, results) {
            if (error) {
                return next(error);
            }
            res.json(results);
        });


});




module.exports = router;