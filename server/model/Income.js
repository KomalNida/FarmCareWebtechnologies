const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reqString = {type: String,required: true}

const reqNumber = {type: Number,required: true}

const reqDate = {type: Date,required: true}

const incomeSchema = new Schema({

  income_type: [reqString],
  income_date: reqDate,
  quantitySold: reqNumber,
  earnedMoney: reqNumber,
  income_receiptNo: {
    type: String
  },

});


module.exports = mongoose.model('Income', incomeSchema);