const mongoose = require('mongoose');

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

const inventorySchema = mongoose.Schema({

  item_name: {
    type: String,
    required: true,
  

  },
  item_quantity: reqNumber,
  item_weight: reqString,
  item_price: {
    type: Number,
    required: true,
  
  },
  item_recorddate: reqDate,
  boughtfrom: reqString,

});



const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;