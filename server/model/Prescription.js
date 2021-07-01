const mongoose = require('mongoose');
const Animal = require('./Animal');
const Schema = mongoose.Schema;


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

const prescriptionSchema = new Schema({

  presc_description: reqString,
  presc_date: reqDate,
  diagnosed_disease: reqString,
  medicineName: {
    type: String,
    required: true,

  },
  treatedBy: {
    type: String,
    required:true,
  },
  animal_id: {
    type: String,
    required:true,
  }
});


module.exports = mongoose.model('Prescription', prescriptionSchema);