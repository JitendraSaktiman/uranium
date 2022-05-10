const BookModel = require("../models/bookModel")
const userModel = require("../models/userModel")
var moment = require('moment'); // require
const bookModel = require("../models/bookModel");

const formatYmd = date => date.toISOString().slice(0, 10);


let date = formatYmd(new Date());

console.log("date:    ",date)

// all regex

let nameRegex = /^[A-Za-z]{1}[A-Za-z ]{1,}$/
let ReviewRegex = /^[0-9]$/
let EmailRegex = /^[A-Za-z]{1}[A-Za-z0-9._]{1,}@[A-Za-z]{2,15}[.]{1}[a-z.]{2,5}$/
let Passwordregex = /^[A-Z0-9a-z]{1}[A-Za-z0-9.@#$&_]{7,14}$/
let titleRegex = /^[A-Za-z1-9]{1}[A-Za-z0-9 ,]{1,}$/
let PinCodeRegex = /^[1-9]{1}[0-9]{5}$/
let ISBNRegex = /^[1-9]{1}[0-9-]{1,}$/


const Bookcreate = async function (req, res) {
    try {
        let body = req.body

        if (Object.keys(body).length === 0) {
            return res.status(400).send({ Status: false, message: " Sorry Body can't be empty" })
        }
        // title validation

        if (!body.title) {
            return res.status(400).send({ Status: false, message: " Title is required" })
        }
        if (!titleRegex.test(body.title)) {
            return res.status(400).send({ Status: false, message: " Title is not valid format" })
        }

        if (!body.excerpt) {
            return res.status(400).send({ Status: false, message: " excerpt is required" })
        }
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

        // if (!body.subcategory) {
        //     return res.status(400).send({ Status: false, message: " subcategory is required" })
        // }
        // if (!nameRegex.test(body.subcategory)) {
        //     return res.status(400).send({ Status: false, message: " subcategory is not in valid format" })
        // }

        if (body.reviews) {
            if (!ReviewRegex.test(body.reviews)) {
                return res.status(400).send({ Status: false, message: " reviews can't use string" })
            }
        }
        // YYYY-MM-DD , we have to use validation for this

        // if (!body.releasedAt) {
        //     return res.status(400).send({ Status: false, message: " releasedAt is required,please use this format YYYY-MM-DD " })
        // }

        let Checkuniquedata = await BookModel.findOne({ $or: [{ title: body.title }, { ISBN: body.ISBN }] })
        if (Checkuniquedata) {
            if (Checkuniquedata.title == body.title) {
                return res.status(400).send({ Status: false, message: " This title has been used already" })
            }
            if (Checkuniquedata.ISBN === body.ISBN) {
                return res.status(400).send({ Status: false, message: " This ISBN has been used already" })
            }
        }

        console.log("body:    ",body)

        let CreateBook = await BookModel.create(body)

        let CheckDelete = await BookModel.findOne(body)

        if (CheckDelete) {
            if (CheckDelete.isDeleted === true) {
                let updatedate = await BookModel.findOneAndUpdate(body, { releasedAt: new Date(), deletedAt: new Date() })
                return res.status(200).send({ Status: true, message: " Sorry  you can not create a book " })
            }
        }

        // this line is being use for giving a release date releasedAt:

        let BookReleasedate = await BookModel.findOneAndUpdate(body,{$set:{releasedAt: date}} , {new:true})

        return res.status(201).send({ Status: true, message: 'Success', data: BookReleasedate })


    }
    catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }
}


// get Api

const GetBook = async function(req,res){
    try{
        // Returns all books in the collection that aren't deleted. Return only book _id, title, excerpt, userId, category, releasedAt, reviews field. Response example

        let Checkbook= await bookModel.find({isDeleted:false}).select({_id:1,title:1,excerpt:1,userId:1, category:1, releasedAt:1, reviews:1 }).sort({title:1})
        
        return res.status(200).send({ Status: true, message: 'Success', data: Checkbook })

    }
    catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }
}


module.exports.Bookcreate = Bookcreate
module.exports.GetBook=GetBook