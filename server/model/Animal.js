const mongoose = require('mongoose');
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
const animalSchema = new Schema({

  animal_name: reqString,
  animal_breed: {
    type: String,
    required: true,

  },
  animal_BirthDate: reqDate,
  animal_JoiningDate: reqDate,
  animal_color: reqString,
  animal_age: {
    type: Number,
    required: true,

  },
  animal_quantity: {
    type: Number,
    required: true,

  },
  animal_height: reqNumber,
  animal_weight: reqNumber,
  animal_stage: {
    type: String,
    required: true,

  },
  animal_status: {
    type: String,
    required: true,

  },
  animal_disease: {
    type: [String]
  },
  animal_treatment: {
    type: [String]
  },
  animal_prescription: {
    type: [String]
  },
});

module.exports = mongoose.model('Animal', animalSchema);