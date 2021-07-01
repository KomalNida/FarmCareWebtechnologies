const mongoose = require('mongoose');
const Person = require('./Farmer');
const Schema = mongoose.Schema;

const FarmerSchema = new Schema({


  id: {

    type: Schema.Types.ObjectId,
    ref: 'Person',
    required: true
  },


});

module.exports = mongoose.model('Farmer', FarmerSchema);