const BookModel = require("../models/bookModel")
const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode');


//------------------------AUTHENTICATION----------------------------***

const TokenExpCheck = async function (req, res, next) {

    try {

        let header = req.headers
        let token = header['x-api-key'] || header['X-API-KEY']
        if (!token) {
            return res.status(400).send({ Status: false, message: " Please enter the token" })
        }

        var decoded = jwt_decode(token);
        var current_time = new Date().getTime() / 1000;

        if (current_time > decoded.exp) {
            return res.status(400).send({ status: false, msg: "Token has expired" })
        }
        else {
            return next()
        }
    } catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }
}

//**************--------------- Authentication and Authorization , if request is coming from req.body ---------*********************//

const Mid1 = async function (req, res, next) {
    try {
        let body = req.body
        let header = req.headers

        let lengthofuserid = body.userId

        let token = header['x-api-key'] || header['X-API-KEY']

        //if req.body is empty

        if (Object.keys(body).length === 0) {
            return res.status(400).send({ Status: false, message: " Sorry Body can't be empty" })
        }

        if (!body.userId) {
            return res.status(400).send({ Status: false, message: " userId is required" })
        }
        if (lengthofuserid.length !== 24) {
            return res.status(400).send({ Status: false, message: "UserId is not valid, please enter 24 digit of UserId" })
        }

        let CheckUser = await userModel.findOne({ _id: body.userId })
        if (!CheckUser) {
            return res.status(400).send({ Status: false, message: " No user found from given userId" })
        }
        try {

            let Decode_token = jwt.verify(token, "FunctionUp Group55")
            if (Decode_token) {

                if (Decode_token.UserId != CheckUser._id) {
                    return res.status(400).send({ Status: false, message: "This is not valid token for this User/Books" })
                }
                return next()
            }
        }
        catch (err) {
            return res.status(400).send({ Status: false, message: "token is not valid" })
        }

    }
    catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }
}

//**************--------------------- Only Authentication for GET API query params --------------------*********************//


const Mid2 = async function (req, res, next) {
    try {
        let query = req.query
        let header = req.headers

        let token = header['x-api-key'] || header['X-API-KEY']


        try {

            let decodedToken = jwt.verify(token, "FunctionUp Group55")

            console.log("okay:    ", decodedToken)

            if (decodedToken) {
                
                req.userId = decodedToken.UserId
                next()
            }
            else {
                return res.status(403).send({ status: false, message: "Invalid authentication" })
            }
        } catch (err) {
            return res.status(400).send({ Status: false, message: "Token is not valid" })
        }

    }
    catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }
}

//**-------------- Authentication & AUTHORIZATION for all API that are coming through the request.params ------------------**//


const Mid3 = async function (req, res, next) {
    try {
        let data = req.params.bookId
        let header = req.headers

        let token = header['x-api-key'] || header['X-API-KEY']


        if (data.length !== 24) {
            return res.status(400).send({ Status: false, message: "Bookid is not valid, please enter 24 digit of bookid" })
        }

        let checkBook = await BookModel.findById({ _id: data })

        if (!checkBook) {
            return res.status(400).send({ Status: false, message: "Book does not exist" })
        }

        let checkuser = await userModel.findOne({ _id: checkBook.userId })

        if (!checkuser) {
            return res.status(400).send({ Status: false, message: "user id does not exist" })
        }

        try {
            let Decode_token = jwt.verify(token, "FunctionUp Group55")
            if (Decode_token) {
                if (Decode_token.UserId != checkuser._id) {
                    return res.status(400).send({ Status: false, message: "This is not valid token for this User/Books" })
                }
                return next()
            }
        }
        catch (err) {
            return res.status(400).send({ Status: false, message: "token is not valid" })
        }
    } catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }
}

// module.exports.Mid1 = Mid1
// module.exports.Mid2 = Mid2
// module.exports.Mid3 = Mid3
// module.exports.TokenExpCheck=TokenExpCheck
module.exports = { Mid1, Mid2, Mid3, TokenExpCheck }