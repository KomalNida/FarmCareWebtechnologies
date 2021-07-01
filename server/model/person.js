const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')



const roles = [
  'Farmer', 'Doctor'
]

const reqString = {
  type: String,
  required: true
}

const reqNumber = {
  type: Number,
  required: true
}

const reqDate = {
  type: Date,
  required: true
}


const PersonSchema = new Schema({

  fname: reqString,
  lname: reqString,
  phone: reqNumber,
  CNIC: reqNumber,
  DOB: reqDate,
  email: reqString,
  username: reqString,
  password: reqString,
  cpassword: reqString,
  role: {
    type: String,
    default: "Farmer",
    enum: roles
  },
  tokens:[
     {
       token: reqString
     }
  ]

});


PersonSchema.pre('save', async function(next) {

    if(this.isModified('password')) {

      this.password = await bcrypt.hash(this.password, 12);
      this.cpassword =await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

//genereate token

PersonSchema.methods.generateAuthToken = async function (){
  try{
     // 2 parameters , payload (unique) and 
   
     let token = jwt.sign({ _id: this._id }, 'KOMALNIDASPRINGSEMWEBTECHNOLOGIESMERNAPP')
     this.tokens = this.tokens.concat({token:token});
     await this.save();
     return token;

  }catch(err){
    console.log(err)
  }
}

module.exports = mongoose.model('Person', PersonSchema);