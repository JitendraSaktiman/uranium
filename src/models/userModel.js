const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({


    title: {
        type: String,
        required: "title is required",
        enum: ["Mr", "Mrs", "Miss"]
    },
    name: {
        type: String,
        required: "name is required",
        trim: true
    },
    phone: {
        type: String,
        required: "phone is require",
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: "email is required",
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: "Password is required",
        //minLen 8, maxLen 15
    },
    address: {
        street: { type: String },
        city: { type: String },
        pincode: { type: String }
    }

}, { timestamps: true })


module.exports = mongoose.model("usermodel", UserSchema);
