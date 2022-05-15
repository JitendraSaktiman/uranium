const BookModel = require("../models/bookModel")
const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken');






//*****----------------- This Middlewae Mid 1 is being used for all Book api -----------------------************/

const Mid1 = async function (req, res, next) {
    try {
      
        let header = req.headers

        let token = header['x-api-key'] || header['X-API-KEY']

        if (!token) {
            return res.status(400).send({ Status: false, message: " Please enter the token" })
        }
        try {
            let decodedToken = jwt.verify(token, "FunctionUp Group55")

            if (decodedToken) {
                req.userId = decodedToken.UserId            // sending UserId in a request, means exporting this decodedToken.UserId 
                return next()
            }
        }catch (err) {
            return res.status(400).send({ Status: false, message: err.message })
        }

    }
    catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }
}

//**-------------- AUTHORIZATION for all API that are coming through the request.params ------------------**//


const Mid2 = async function (req, res, next) {
    try {
        let data = req.params.bookId

        if (data.length !== 24) {
            return res.status(400).send({ Status: false, message: "Bookid is not valid, please enter 24 digit of bookid" })
        }

        let checkBook = await BookModel.findOne({ _id: data })

        if (!checkBook) {
            return res.status(400).send({ Status: false, message: "Book does not exist" })
        }

        let checkuser = await userModel.findOne({ _id: checkBook.userId })

        if (!checkuser) {
            return res.status(400).send({ Status: false, message: "user id does not exist" })
        }

        const AuthoriZation= req.userId   // this one is being import from middleware mid1 , here it has decodetoken user id

        if (AuthoriZation != checkuser._id) {
            return res.status(400).send({ Status: false, message: "You are not authorise person,Please use exact token" })
        }else{
            return next()
        }
        
    } catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }
}


module.exports = { Mid1, Mid2 }