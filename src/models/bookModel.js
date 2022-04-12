const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: {
        type:String,
        unique: true,
        required: true,
    },
    authorName: {
        type: String,
        required:true,
    },
    category: {
        type: String,

    },
    year: {
        type: String,
        unique:false,
        required: true,
    },
},{timestamps: true});

module.exports = mongoose.model('Book', bookSchema) //books
