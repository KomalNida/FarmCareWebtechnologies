const express = require('express');
const router = express.Router();

const Animal = require('../model/Animal');



/* GET Operations */

//Farmer Dashboard
router.get('/', function (req, res, next) {
    

});

router.post('/addanimal', async (req, res) => {

   const { animal_name, animal_breed, animal_BirthDate,animal_JoiningDate,animal_color ,
   animal_age, animal_quantity, animal_height,   animal_weight, animal_stage,animal_status }= req.body;

   if (!animal_name || !animal_breed || !animal_BirthDate || !animal_JoiningDate || !animal_color || !animal_age ||
    !animal_quantity || !animal_height || !animal_weight || !animal_stage || !animal_status) {
        return res.status(422).json({
        error: "Please fill all fields"
        });
  }

    try {
        const animalexist = await Animal.findOne({
            animal_name:animal_name
          });

          if (animalexist) {
            return res.status(201).json({
              message: "Animal with this already exists."
            });
        
         }else{ 
                const animal =  new Animal (req.body);
                const savedAnimal = await animal.save();
                    res.send(savedAnimal);
                    console.log(savedAnimal);
          }

    } catch (error) {
        res.send(error)
    }

});

//View all animals 

router.get('/viewanimal', async (req, res) => {

    Animal.find().exec(function (error, result, next) {
        if (error) return next(error);
        res.json(result);
    });



});

//serach animal by name 

router.get('/viewanimal/:name', async (req, res) => {
    Animal.find({
        animal_name: req.params.name
    }).exec(function (error, result, next) {
        if (error) return next(error);
        res.json(result);
    });
});


//serach animal by id 

router.get('/viewanimal/:id', async (req, res) => {
    Animal.find({
        _id: req.params.id
    }).exec(function (error, result, next) {
        if (error) return next(error);
        res.json(result);
    });

});
//Delete animal by  name

router.delete('/deleteanimal/:id', function (req, res, next) {
    Animal.deleteOne({
        _id: req.params.id
    }, function (error, results) {
        if (error) {
            return next(error);
        }

        res.json(results);
    });
});

//update Animal

router.put('/updateanimal/:id', function (req, res, next) {
     var animalid= req.params.id;
     Animal.findOneAndUpdate({
            _id: animalid
        }, req.body, {
            new: true,
            
        },
        function (error, results) {
            if (error) {
                return next(error);
            }
            // Respond with valid data
            res.json(results);
        });


});


router.get('/report', async (req, res) => {

    Animal.find({}).select("animal_breed -_id ").exec(function (error, result, next) {
        if (error) return next(error);
        res.json(result);
    });



});



module.exports = router;