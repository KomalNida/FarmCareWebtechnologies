const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reqString = {type: String,required: true}

const reqNumber = {type: Number,required: true}

const reqDate = {type: Date,required: true}

const ExpenseSchema = new Schema({


  expense_type: [reqString],
  expense_date: reqDate,
  spentMoney: reqNumber,
  expense_receiptNo: {
    type: String
  },

});


module.exports = mongoose.model('Expense', ExpenseSchema);