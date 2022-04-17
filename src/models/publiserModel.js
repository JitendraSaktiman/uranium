const mongoose = require('mongoose');

const publiserSchema = new mongoose.Schema( {

    publiser: String,
    headQuarter:String

}, { timestamps: true });

module.exports = mongoose.model('Publiser', publiserSchema)//publisers
