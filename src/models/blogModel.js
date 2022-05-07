
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        authorId: {
            type: ObjectId,
            ref: "Author",
            required: true
        },
        tags: [String],
        category: String,
        subcategory: [String],
        deletedAt: {
            type: String,
            default: "Date"
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        publishedAt: {
            type: String,
            default: "Date"
        },
        isPublished: {
            type: Boolean,
            default: false
        }
    }, { timestamps: true })

module.exports = mongoose.model('Blog', blogsSchema);