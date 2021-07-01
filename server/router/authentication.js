const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const Person = require('../model/person');
const Farmer = require('../model/Farmer');
const Doctor = require('../model/Doctor');
const Librarian= require('../model/Librarian');
const bcrypt = require('bcryptjs')

const authenticate= require('../middleware/authenticate');



router.get('/', (req, res) => {
  res.send(`Hello world from the authentication router js`);
});




router.post('/register', async (req, res) => {

  const {
    fname,
    lname,
    phone,
    CNIC,
    DOB,
    email,
    username,
    password,
    cpassword,
    role
  } = req.body;

  if (!fname || !lname || !phone || !CNIC || !DOB || !email ||
    !username || !password || !cpassword || !role) {
    return res.status(422).json({
      error: "Please fill all fields"
    });
  }

  try {

    const userExist = await Person.findOne({
      email: email
    });

    if (userExist) {
      return res.status(201).json({
        message: "User with this email already exists."
      });
    } else if ( password !== cpassword){
      return res.status(201).json({
        message: "Password and confirm password doesnot match."
      });
    } else{

      const person = new Person({
        fname,
        lname,
        phone,
        CNIC,
        DOB,
        email,
        username,
        password,
        cpassword,
        role
      });
  
  
      const savedUser = await person.save();
  
      // console.log(savedUser)
  
      person.id = savedUser.id;
      // console.log("person id: ", person._id)
  
      const personDetail = savedUser.role == "Farmer" ? new Farmer({
        id: person.id
  
      }) : new Doctor({
        id: person.id,
        licenseNo: req.body.licenseNo
      })
      const savedPersonDetails = await personDetail.save();
      res.send(savedPersonDetails)

    }

    
    // console.log("after creating farmer", savedPersonDetails.id)

  } catch (error) {
    res.send(error)
  }

});



router.post('/signin', async (req, res) => {
  
  try {
    const {
      email,
      password,
      role
    } = req.body;

    if (!email || !password ) {
      return res.status(400).json({
        error: "Please fill all fields"
      });
    }
    const userlogin = await Person.findOne({
      email: email,
      role:role,
    });

    if(userlogin){

      const compareUser = await bcrypt.compare(password, userlogin.password);
      const token = await userlogin.generateAuthToken();
      const user = await Person.findOne({email:req.body.email})
      res.json({token: token,user : user,message: "User Signed In Successfully!"});
      
      // res.cookie("jwtoken", token, {
      //   expires: new Date(Date.now()+ 25892000000),
      //   httpOnly: true
      // });
      if(!compareUser){
        res.status(400).json({error: "Invalid Credentials"});
        return
      }

      // res.json({,});
      return
    }else{
      res.status(400).json({error: "Invalid Credentials"});
      return
    }
  } catch (err) {
    console.log(err);
  }

});


router.get('/user/:role', async(req,res) => {

      Person.find({
        role: req.params.role
    }).exec(function (error, result, next) {
        if (error) return next(error);
        res.json(result);
    });
});


router.get('/user/:name', async(req,res) => {

  Person.find({
    fname: req.params.name , lname:req.params.name
}).exec(function (error, result, next) {
    if (error) return next(error);
    res.json(result);
});
});




module.exports = router;