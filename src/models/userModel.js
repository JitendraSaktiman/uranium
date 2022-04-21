const mongoose = require('mongoose');
const moment = require('moment')
const userSchema = new mongoose.Schema( {
    // Write the schema content
    name:{
        type: String,
        uniqe:true,
    },
	balance:{
        type:Number,
        default:100,
     },                                                      
	address:String,                                          //"New delhi",
	age: Number,
 	gender: {
         type:String,
         enum: ["male","female","other"],
      },                                                      
	isFreeAppUser: {
        type:Boolean,
        default:false,
    },
                                      
}, { timestamps: true });

module.exports = mongoose.model('User1', userSchema) //users
