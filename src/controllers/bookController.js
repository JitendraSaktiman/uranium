const BookModel = require("../models/bookModel")
const userModel = require("../models/userModel")
const reviewModel = require("../models/reviewModel")
var moment = require('moment');

//validator

const isValid = function (value) {
    if (typeof (value) === 'undefined' || typeof (value) === null) {
        return false
    }
    if (typeof (value).trim().length == 0) {
        return false
    }
    if (typeof (value) === "string" && (value).trim().length > 0) {
        return true
    }
}

 


// let date = formatYmd(new Date());



// all regex validtaion

let nameRegex = /^[A-Za-z]{1}[A-Za-z ,-]{1,}$/


let titleRegex = /^[A-Za-z1-9]{1}[A-Za-z0-9 ,-]{0,10000}$/

let ISBNRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$$/

let today = new Date();
let indianTime = today.toLocaleString("en-US", 'Asia/Kolkata');

//----------------------------------CREATE BOOK-----------------------------***

const Bookcreate = async function (req, res) {

    try {

        let body = req.body
        //if req.body is empty

        if (Object.keys(body).length === 0) {
            return res.status(400).send({ Status: false, message: " Sorry Body can't be empty" })
        }

        //***********======================   getting data from body  ======================***********   //
        
    
        let lengthofuserid = body.userId

        if (!body.userId) {
            return res.status(400).send({ Status: false, message: " userId is required" })
        }
        if (lengthofuserid.length !== 24) {
            return res.status(400).send({ Status: false, message: "UserId is not valid, please enter 24 digit of UserId" })
        }
        //********** ===================================== Applying authorization ================================================= *//

        const Verification = req.userId        // this is being import from middleware mid1

        let checkUserdetail = await userModel.findOne({ _id: body.userId })

        if (!checkUserdetail) {
            return res.status(400).send({ Status: false, message: " No user found from given userId" })
        }

        if (checkUserdetail) {
            if (Verification != checkUserdetail._id) {
                return res.status(400).send({ Status: false, message: "You are not authorise person" })
            }
        }


        //************************************************************************************************************************//

        if (body.isDeleted === true) {
            return res.status(400).send({ Status: true, message: " Sorry  you are not allowed to create a book " })
        }

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
        //------- Checking ISBN & validation ---------------------- //
        if (!body.ISBN) {
            return res.status(400).send({ Status: false, message: " ISBN is required" })
        }
        if (!ISBNRegex.test(body.ISBN)) {
            return res.status(400).send({ Status: false, message: " ISBN is not in valid format" })
        }
        //------- Checking ISBN & validation ---------------------- //

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

        if (body.reviews>0) {
            return res.status(400).send({ Status: false, message: " Sorry you can not create review yourself" })
        }

        //==================================================================================================//
        // YYYY-MM-DD , we have to use validation for this

        if (!body.releasedAt) {
            return res.status(400).send({ Status: false, message: " releasedAt is required,please use this format YYYY-MM-DD " })
        }

        let date1 = moment.utc(body.releasedAt, 'YYYY-MM-DD') // UNIVERSAL TIME COORDINATED,IF WE ONLY USE MOMENT SO IT WORK IN LOCAL MODE
        if (!date1.isValid()) {
            return res.status(400).send({ status: false, message: "Invalid Date" })
        }

        body.releasedAt = date1

        //*==============================================================================================*//

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

        //**********************  If query have all three combination of userid,category,subcategory ********************** //

        if (query.userId && query.category && query.subcategory) {

            let RecordBook = await BookModel.find({ userId: query.userId, category: query.category, isDeleted: false, subcategory: query.subcategory }).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 }).sort({ title: 1 })

            if (RecordBook.length > 0) {
                return res.status(200).send({ Status: true, message: 'Success', data: RecordBook })
            }
            else {
                return res.status(404).send({ Status: false, message: " No data found from all combination / can be isDeleted true" })
            }
        }

        //**********************  If query have any two combination of userid,category,subcategory ********************** //

        if (query.userId && query.category || query.subcategory && query.category || query.userId && query.subcategory) {

            let Checkbook = await BookModel.find({ $or: [{ userId: query.userId, category: query.category, isDeleted: false }, { userId: query.userId, subcategory: query.subcategory, isDeleted: false }, { subcategory: query.subcategory, category: query.category, isDeleted: false }] }).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 }).sort({ title: 1 })

            if (Checkbook.length > 0) {
                return res.status(200).send({ Status: true, message: 'Success', data: Checkbook })
            }
            else {
                return res.status(404).send({ Status: false, message: " No data found with this two filter combination  / can be isDeleted true" })
            }
        }


        //**********************  If query have any combination of userid,category,subcategory ********************** //

        if (query.userId || query.category || query.subcategory) {

            let BookCheck = await BookModel.find({ $or: [{ userId: query.userId, isDeleted: false }, { subcategory: query.subcategory, isDeleted: false }, { category: query.category, isDeleted: false }] }).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 }).sort({ title: 1 })

            if (BookCheck.length > 0) {
                return res.status(200).send({ Status: true, message: 'Success', data: BookCheck })
            }
            else {
                return res.status(404).send({ Status: false, message: " No data found from single filter  / can be isDeleted true" })
            }

        }

        //**********************  If query have no combination of userid,category,subcategory ********************** //

        let FindAllBook = await BookModel.find({ isDeleted: false }).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 }).sort({ title: 1 })
        if (FindAllBook.length > 0) {
            return res.status(200).send({ Status: true, message: 'Success', data: FindAllBook })
        }
        else {
            return res.status(404).send({ Status: false, message: " No data found without filter  / can be isDeleted true" })
        }

    }
    catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }
}

//------------------------------------- GET BOOK BY PARAM----------------------------***

const resultBook = async function (req, res) {
    try {

        let FindBook = await BookModel.findById({ _id: req.params.bookId })

        let reviewsData = await reviewModel.find({ bookId: req.params.bookId, isDeleted: false }).select({ _id: 1, bookId: 1, reviewedBy: 1, reviewedAt: 1, rating: 1, review: 1 })


        const { _id, title, excerpt, userId, category, subcategory, deleted, reviews, deletedAt, releasedAt, createdAt, updatedAt } = FindBook

        if (FindBook.isDeleted === true) {
            let resultant = {}
            resultant = { _id, title, excerpt, userId, category, subcategory, deleted, reviews, deletedAt, releasedAt, createdAt, updatedAt, reviewsData, reviewsData }
            return res.status(200).send({ Status: true, message: 'Success', data: resultant })
        }

        let data = {}
        data = { _id, title, excerpt, userId, category, subcategory, deleted, reviews, deletedAt: "", releasedAt, createdAt, updatedAt, reviewsData }

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

            let CheckData = await BookModel.findOne({ $or: [{ title: body.title }, { ISBN: body.ISBN }] })

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
            //============================Checking released at if coming=======================================//

            if(body.releasedAt){
                let date1 = moment.utc(body.releasedAt, 'YYYY-MM-DD') // UNIVERSAL TIME COORDINATED,IF WE ONLY USE MOMENT SO IT WORK IN LOCAL MODE
                if (!date1.isValid()) {
                    return res.status(400).send({ status: false, message: "Invalid Date" })
                }
                body.releasedAt = date1
            }

            //==================================================================================================//
            if(body.title){
                if (!titleRegex.test(body.title)) {
                    return res.status(400).send({ Status: false, message: " Title is not valid format" })
                }
            }

            //********************************************************************************************************/
            
            if(body.ISBN){
                if(!ISBNRegex.test(body.ISBN)) {
                    return res.status(400).send({ Status: false, message: " ISBN is not in valid format" })
                }
            }
        
            //********************************************************************************************************/
            if(body.excerpt){
                if (!titleRegex.test(body.excerpt)) {
                    return res.status(400).send({ Status: false, message: " excerpt is not valid format" })
                }
            }
            //--------------- Updating book -------------------------------------------------------------------//

            let CheckDeleted = await BookModel.findOneAndUpdate({ $and: [{ _id: data.bookId }, { isDeleted: false }] }, { $set: { title: body.title, excerpt: body.excerpt, ISBN: body.ISBN, releasedAt: body.releasedAt } }, { new: true })

            if (CheckDeleted) {
                return res.status(200).send({ Status: true, message: 'Success', data: CheckDeleted })
            }
            else {
                return res.status(404).send({ Status: false, message: " Sorry you can't update this book due to deleted book" })
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

        let data = req.params

        let BookId = data.bookId

        let CheckDeleted = await BookModel.findOneAndUpdate({ $and: [{ _id: data.bookId }, { isDeleted: false }] }, { $set: { isDeleted: true, deletedAt: indianTime } }, { new: true })

        if (!CheckDeleted) {
            return res.status(404).send({ Status: false, message: " This book is deleted book" })
        }

        // if book is being delete, then we will delete the all review for that book

        let UpdateDeleteReview = await reviewModel.updateMany({ bookId: BookId }, { isDeleted: true })

        // sending the bookdeleted data for response 

        return res.status(200).send({ Status: true, message: 'Successfully deleted the book', data: CheckDeleted })

    } catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }
}

//-----------------------------EXPORT ALL API FUNCTION----------------------------------***


module.exports = { Bookcreate, GetBook, resultBook, UpdateBook, DeleteBook }