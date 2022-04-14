const mongoose = require('mongoose');

const allBookSchema = new mongoose.Schema({
 
    bookName:String,
    author_id:{
        type:Number,
        required:true
    },
    price:Number,
    ratings:Number,

},{timestamps:true});
 
module.exports = mongoose.model('NoteBook', allBookSchema) //notebooks

 
