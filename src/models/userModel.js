const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema( {
//     firstName: String,
//     lastName: String,
//     mobile: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     emailId: String,
//     gender: {
//         type: String,
//         enum: ["male", "female", "LGBTQ"] //"falana" will give an error
//     },
//     age: Number,
    // isIndian: Boolean,
    // parentsInfo: {
    //     motherName: String,
    //     fatherName: String,
    //     siblingName: String
    // },
    // cars: [ String  ]
// }, { timestamps: true });

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

module.exports = mongoose.model('User', bookSchema)

// module.exports = mongoose.model('User', userSchema) //users



// String, Number
// Boolean, Object/json, array