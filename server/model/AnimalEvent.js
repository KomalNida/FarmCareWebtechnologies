const mongoose = require('mongoose');
const Animal = require('./Animal');
const Schema = mongoose.Schema;


const reqString = {type: String,required: true}



const animaleventSchema = new Schema({

  event_name: {   
    type:String,
    required: true,
    
},
  event_type: reqString,
  disease_symptoms: { type: String},
  diagnosed_disease:{ type: String} ,
  vaccine_Name:{
    type:String,
},
  weighed_results: { type: String},
  additional_notes:{ type: String},
  treatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  animal_id: {
    type: Schema.Types.ObjectId,
    ref: 'Animal',
  }
});


module.exports = mongoose.model('Animalevent', animaleventSchema);