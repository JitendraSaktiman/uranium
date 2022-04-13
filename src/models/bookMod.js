const mongoose= require('mongoose')

const bookCollection = new mongoose.Schema ( {

    bookName:{
        type: String,
        required: true,
    },
    price:{
        indianPrice: String,
        europeanPrice:String,
    },
    year:{
        type:Number,
        default:2021,
    },
    tags:[String],
    
    authorName: String,

    totalPages: String,//number

    stockAvalable: Boolean,
    

},{timestamps: true});

module.exports = mongoose.model('BookLibrary', bookCollection)// booklibrarys
