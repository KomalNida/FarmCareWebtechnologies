const express = require('express');
const router = express.Router();
const Farmer = require('../model/Farmer');
const Inventory = require('../model/Inventory');
const Income = require('../model/Income');
const Expense = require('../model/Expense');
const MilkRecord = require('../model/MilkRecord');
const Prescription = require('../model/Prescription');
const Animal = require('./Animal');
const Doctor = require('../model/Doctor');
const Person = require('../model/person');




/* GET Operations */

//Farmer Dashboard
router.get('/', function (req, res, next) {
    res.send(`
            <h1>Web Tech Lab Sessional</h1>
            <h3>Endpoints</h3>
            <ul>
                <li>
                    
                    Use <a href="/animal"> /animal </a>  to view animal dashboard
                </li>
                <li>
                    Use <a href="/viewprescription"> /viewprescription </a>  to view prescription of an animal
                   
                </li>
                <li>
                 
                    Use <a href="/profile"> /profile </a>  to view profile
                </li>
            </ul>
            <hr>
            <h3>Submission by:</h3>
            <table border =  3>
                <th>Reg No.</th>
                <th>Name</th>

                <tr>
                    <td>
                        SP18-BSE-115
                    </td>
                    <td>
                        Komal Nida
                    </td>
                </tr>
            </table>
    `);


});



// view profile

router.get('/profile/:id', async (req, res) => {

    try{
        Person.find({
            _id: req.params.id
        }).exec(function (error, result, next) {
            if (error) return next(error);
            res.json(result);
        });
    } catch(err){
          res.send(err);
    }
    
 }) ;   
 

// view animal dashboard

router.get('/animal/', function (req, res, next) {

    res.send(Animal);


});




// view Doctors list

router.get('/viewDoctor', function (req, res, next) {
    Doctor.find().exec(function (error, result, next) {
        if (error) return next(error);
        res.json(result);
    });

});



//POST Operations


// Add milk

router.post('/Addmilkrecord', async (req, res) => {

    const { milkrecord_type, milking_date,totalMilkProduced ,totalMilkConsumed, noOfCattleMilked,CattleMilked}= req.body;

    try {
 
        if(milkrecord_type, milking_date,totalMilkProduced ,totalMilkConsumed,CattleMilked){
            const milk = new MilkRecord(req.body);
            const savedmilk = await milk.save();
            res.send(savedmilk);
            
        }
        else if(milkrecord_type, milking_date,totalMilkProduced ,totalMilkConsumed,noOfCattleMilked){
            const milk = new MilkRecord(req.body);
            const savedmilk = await milk.save();
            res.send(savedmilk);
        }
      

    } catch (error) {
        res.send(error)
    }


});

router.get('/viewmilkrecord', async (req, res) => {
    MilkRecord.find().exec(function (error, result) {
        if (error) return (error);
        res.json(result);
    });

}); 

router.get('/report', async (req, res) => {
    MilkRecord.find({}).select("milking_date totalMilkProduced totalMilkConsumed -_id ").exec(function (error, result) {
        if (error) return (error);
        res.json(result);
    });

}); 

router.get('/viewmilkrecord/:type', async (req, res) => {
    MilkRecord.find({
        milkrecord_type: req.params.type
    }).exec(function (error, result, next) {
        if (error) return next(error);
        res.json(result);
        
    });

});

router.put('/updatemilkrecord/:id', function (req, res, next) {
    var milk= req.params.id;
    MilkRecord.findOneAndUpdate({
           _id: milk
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

router.delete('/deletemilkrecord/:id', function (req, res, next) {
    MilkRecord.deleteOne({
        _id: req.params.id
    }, function (error, results) {
        if (error) {
            return next(error);
        }

        res.json(results);
    });
});



module.exports = router;