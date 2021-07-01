const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reqString = {type: String,required: true}

const reqNumber = {type: Number,required: true}

const reqDate = {type: Date,required: true}

const milkrecordSchema = new Schema({

  milkrecord_type: reqString,
  milking_date: reqDate,
  totalMilkProduced: reqString,
  totalMilkConsumed: reqString,
  noOfCattleMilked: {
    type: Number
  },
  CattleMilked: {
    type: String
  }

});


module.exports = mongoose.model('MilkRecord', milkrecordSchema);