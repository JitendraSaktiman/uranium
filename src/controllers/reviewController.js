const BookModel = require("../models/bookModel")
const UserModel = require("../models/userModel")
const ReviewModel = require("../models/reviewModel")
const reviewModel = require("../models/reviewModel")


let nameRegex = /^[A-Za-z]{1}[A-Za-z ]{1,}$/

let ratingRegext = /^[1-5]{1}$/

//-----------------------CREATE REVIEW ---------------------------------------***

const CreateReview = async function (req, res) {

    try {

        // GETING DATA FROM REQ.BODY

        let data = req.params.bookId
        let body = req.body

        console.log(body)

        if (!data) {
            return res.status(400).send({ Status: false, message: "No book id found" })
        }
        let Checkbook = await BookModel.findOne({_id:data,isDeleted:false})
        
        if (!Checkbook) {
            return res.status(400).send({ Status: false, message: "Book does not exist / deleted book " })
        }

        if (Object.keys(body).length === 0) {
            return res.status(400).send({ Status: false, message: " Sorry Body can't be empty" })
        }

        if(!body.reviewedBy){
            return res.status(400).send({ Status: false, message: "Please enter the reviedwedBy" })
        }
        if(!nameRegex.test(body.reviewedBy)){
            return res.status(400).send({ Status: false, message: "Please enter the valid reviedwedBy name" })
        }

        if(!body.rating){
            return res.status(400).send({ Status: false, message: "Please enter the rating" })
        }
        //REGEX VALIDATIONS 
        if(!ratingRegext.test(body.rating)){
            return res.status(400).send({ Status: false, message: "Please enter the valid rating min 1, max 5 " })
        }

        let result = {}
        let bookId=data
        let reviewedBy= body.reviewedBy
        let rating=body.rating
        let reviewedAt= new Date()
        let review= body.review

        //DESTRUCTURE
        result={bookId,reviewedBy,rating,reviewedAt,review}

        //CREATE REVIEW DOCUMENT
        let ReviewCreate= await reviewModel.create(result)

        //SELECT PARTICULAR KEY 
        let ShowReview= await reviewModel.findOne(result).select({_id:1,bookId:1,reviewedBy:1,reviewedAt:1,rating:1,review:1})

        //FIND ID AND UPDATE REVIEW
        let UpdateCountReview =await BookModel.findByIdAndUpdate({_id:data},{$inc:{reviews:1}})

        return res.status(201).send({ Status: true, message: 'Success', data: ShowReview })

    } catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }

}

module.exports.CreateReview=CreateReview