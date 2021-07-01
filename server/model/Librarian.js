const mongoosedb = require('mongoose');


const LibrarianSchema = new mongoosedb.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    Age: {
        type: Number,
        required: true,
        min: [15, 'Age should be greater than 14']
    },
    Address: {
        city: String,
        country: String,
    },
    Phoneno: {
        type: String,
        required: true,
    },
    Email:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true,
    },
    DOB:{
        type:String,
        required:true,
    },
    CNIC:{
        type:String,
        required:true,
    },
    Wallet:{
        type:Number,
        required:true,
    }
});


module.exports = mongoosedb.model('Librarian', LibrarianSchema);
