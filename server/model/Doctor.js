const mongoose = require('mongoose');
const Person = require('./person');

const Schema = mongoose.Schema;

const doctorSchema = new Schema({


    id: {

        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: true
    },

    licenseNo: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('Doctor', doctorSchema);