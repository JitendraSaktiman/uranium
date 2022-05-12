const BookModel = require("../models/bookModel")
const userModel = require("../models/userModel")
var moment = require('moment'); // require
const bookModel = require("../models/bookModel");
const reviewModel = require("../models/reviewModel")

const formatYmd = date => date.toISOString().slice(0, 10);


let date = formatYmd(new Date());



// all regex validtaion

let nameRegex = /^[A-Za-z]{1}[A-Za-z ]{1,}$/
let ReviewRegex = /^[0-9]$/

let titleRegex = /^[A-Za-z1-9]{1}[A-Za-z0-9 ,-]{1,}$/

let ISBNRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$$/
let dateRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/

//----------------------------------CREATE BOOK-----------------------------***

const Bookcreate = async function (req, res) {

    try {
        //get data from body
        let body = req.body
         //if req.body is empty
        if (Object.keys(body).length === 0) {
            return res.status(400).send({ Status: false, message: " Sorry Body can't be empty" })
        }

        // if(body.isDeleted === true){
        //     return res.status(200).send({ Status: true, message: " Sorry  you are not allowed " })
        // }
        // title validation

        if (!body.title) {
            return res.status(400).send({ Status: false, message: " Title is required" })
        }
        // using  regex validation 
        if (!titleRegex.test(body.title)) {
            return res.status(400).send({ Status: false, message: " Title is not valid format" })
        }
         // using validation
        if (!body.excerpt) {
            return res.status(400).send({ Status: false, message: " excerpt is required" })
        }
        // using  regex validation 
        if (!titleRegex.test(body.excerpt)) {
            return res.status(400).send({ Status: false, message: " excerpt is not valid format" })
        }


        if (!body.ISBN) {
            return res.status(400).send({ Status: false, message: " ISBN is required" })
        }
        if (!ISBNRegex.test(body.ISBN)) {
            return res.status(400).send({ Status: false, message: " ISBN is not in valid format" })
        }

        if (!body.category) {
            return res.status(400).send({ Status: false, message: " category is required" })
        }
        if (!nameRegex.test(body.category)) {
            return res.status(400).send({ Status: false, message: " category is not in valid format" })
        }

        if (!body.subcategory) {
            return res.status(400).send({ Status: false, message: " subcategory is required" })
        }
        if (!nameRegex.test(body.subcategory)) {
            return res.status(400).send({ Status: false, message: " subcategory is not in valid format" })
        }

        if (body.reviews) {
            if (!ReviewRegex.test(body.reviews)) {
                return res.status(400).send({ Status: false, message: " reviews can't use string" })
            }
        }
        // YYYY-MM-DD , we have to use validation for this

        if (!body.releasedAt) {
            return res.status(400).send({ Status: false, message: " releasedAt is required,please use this format YYYY-MM-DD " })
        }
        if (!dateRegex.test(body.releasedAt)) {
            return res.status(400).send({ Status: false, message: " releasedAt is not in valid format, please use this format YYYY-MM-DD " })
        }


        let Checkuniquedata = await BookModel.findOne({ $or: [{ title: body.title }, { ISBN: body.ISBN }] })
        if (Checkuniquedata) {
            if (Checkuniquedata.title == body.title) {
                return res.status(400).send({ Status: false, message: " This title has been used already" })
            }
            if (Checkuniquedata.ISBN === body.ISBN) {
                return res.status(400).send({ Status: false, message: " This ISBN has been used already" })
            }
        }

        let CreateBook = await BookModel.create(body)

        let CheckDelete = await BookModel.findOne(body)

        
        if (CheckDelete) {
            if (CheckDelete.isDeleted === true) {
                let updatedate = await BookModel.findOneAndUpdate(body, { releasedAt: body.releasedAt, deletedAt: new Date() })
                return res.status(200).send({ Status: true, message: " Sorry  you can not create a book " })
            }
        }

        return res.status(201).send({ Status: true, message: 'Success', data: CreateBook })


    }
    catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }
}


//------------------------------GET BOOK -------------------------------------------***

const GetBook = async function (req, res) {
    try {

        let query = req.query

        let Checkbook = await bookModel.find({ $and: [query, { isDeleted: false }] }).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 }).sort({ title: 1 })
        if (Checkbook.length > 0) {
            return res.status(200).send({ Status: true, message: 'Success', data: Checkbook })
        }

        return res.status(400).send({ Status: false, message: " No data found due to is Deleted true" })


    }
    catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }
}

//------------------------------------- GET BOOK BY PARAM----------------------------***

const resultBook = async function (req, res) {
    try {

        let FindBook = await BookModel.findById({ _id: req.params.bookId })

        let reviewsData = await reviewModel.find({ bookId: req.params.bookId }).select({ _id: 1, bookId: 1, reviewedBy: 1, reviewedAt: 1, rating: 1, review: 1 })

        let _id = FindBook._id;
        let title = FindBook.title
        let excerpt = FindBook.excerpt
        let userId = FindBook.userId
        let category = FindBook.category
        let subcategory = FindBook.subcategory
        let deleted = FindBook.isDeleted
        let reviews = FindBook.reviews
        let releasedAt = FindBook.releasedAt
        let createdAt = FindBook.createdAt
        let updatedAt = FindBook.updatedAt
        let deletedAt = FindBook.deletedAt
        

        if(FindBook.isDeleted=== true){
            let resultant ={}
            resultant = { _id, title, excerpt, userId, category, subcategory, deleted, reviews, deletedAt: FindBook.deletedAt, releasedAt, createdAt, updatedAt, reviewsData }
            return res.status(200).send({ Status: true, message: 'Success', data: resultant })
        }
        
        let data = {}
        data = { _id, title, excerpt, userId, category, subcategory, deleted, reviews, deletedAt:"", releasedAt, createdAt, updatedAt, reviewsData }

        return res.status(200).send({ Status: true, message: 'Success', data: data })

    } catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }

}

//--------------------------------------UPDATE BOOK BY PARAMS(BOOKID)---------------------------*** 

const UpdateBook = async function (req, res) {

    try {

        let body = req.body
        let data = req.params

        if (Object.keys(body).length === 0) {
            return res.status(400).send({ Status: false, message: " Sorry Body can't be empty" })
        }

        if (body.title || body.excerpt || body.releasedAt || body.ISBN) {

            let CheckData = await bookModel.findOne({ $or: [{ title: body.title }, { ISBN: body.ISBN }] })


            console.log("help:      ", CheckData)

            if (CheckData) {
                if (CheckData.isDeleted === true) {
                    return res.status(404).send({ Status: false, message: " This book is deleted book" })
                }
                if (CheckData.title === body.title) {
                    return res.status(400).send({ Status: false, message: " This title has been used already" })
                }
                if (CheckData.ISBN === body.ISBN) {
                    return res.status(400).send({ Status: false, message: " This ISBN has been used already" })
                }
            }

            let CheckDeleted = await BookModel.findOneAndUpdate({ $and: [{ _id: data.bookId }, { isDeleted: false }] }, { $set: { title: body.title, excerpt: body.excerpt, ISBN: body.ISBN, releasedAt: body.releasedAt } }, { new: true })

            if (CheckDeleted) {
                return res.status(200).send({ Status: true, message: 'Success', data: CheckDeleted })
            }
            else {
                return res.status(404).send({ Status: false, message: " This book is deleted book 2" })
            }

        }
        else {
            return res.status(400).send({ Status: false, message: " Sorry you are not allowed to update by this key" })
        }

    } catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }
}

//----------------------------------------- DeleteBook BY PARAMS----------------------------***

const DeleteBook = async function (req, res) {
    try {

        let data= req.params

        let CheckDeleted = await BookModel.findOneAndUpdate({$and:[{ _id: data.bookId },{ isDeleted: false }]},{$set:{isDeleted:true,deletedAt: new Date}},{ new: true })

        if(!CheckDeleted){
            return res.status(404).send({ Status: false, message: " This book is deleted book" })
        }

        return res.status(200).send({ Status: true, message: 'Success', data: CheckDeleted })

    } catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }
}

//-----------------------------EXPORT ALL API FUNCTION----------------------------------***

module.exports.Bookcreate = Bookcreate
module.exports.GetBook = GetBook
module.exports.resultBook = resultBook
module.exports.UpdateBook = UpdateBook
module.exports.DeleteBook = DeleteBook