const mongoose = require('mongoose');
const moment = require('moment')

const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema( {
    // Write the schema content
     
	userId:{
        type: ObjectId,
        ref:"User1"
    },
	productId: {
        type:ObjectId,
        ref:"Product"
    },
	amount: Number,
	isFreeAppUser:Boolean, //true, 
    date: { type: Date, default: Date.now },              // “22/11/2021”                                 
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema) //orders
