const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    excerpt: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: ObjectId,
        required: true,
        ref: "usermodel",
    },
    ISBN: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: [String],    // [{type: String, required: true}]
        required: true
    },
    reviews: {
        type: Number,
        default: 0,
        comment: "Holds number of reviews of this book"
    },
    deletedAt: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    releasedAt: {
        type: Date,
        required: true,
        // format: ("YYYY-MM-DD")
    },


}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema)