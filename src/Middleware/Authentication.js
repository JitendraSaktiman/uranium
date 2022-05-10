const BookModel = require("../models/bookModel")
const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken')





const Mid1 = async function (req, res, next) {
    try {
        let body = req.body
        let header = req.headers

        let token = header['x-api-key'] || header['X-API-KEY']

        if (!token) {
            return res.status(400).send({ Status: false, message: " Please enter the token" })
        }

        if (Object.keys(body).length === 0) {
            return res.status(400).send({ Status: false, message: " Sorry Body can't be empty" })
        }

        if (!body.userId) {
            return res.status(400).send({ Status: false, message: " userId is required" })
        }

        let CheckUser = await userModel.findOne({ _id: body.userId })
        if (!CheckUser) {
            return res.status(400).send({ Status: false, message: " No user found from given userId" })
        }

        // try {
        let Decode_token = jwt.verify(token, "FunctionUp Group55")
        if (Decode_token) {
            if (Decode_token.UserId != CheckUser._id) {
                return res.status(400).send({ Status: false, message: "This is not valid token for this User/Books" })
            }
            return next()
        }
        // }
        // catch (err) {
        //     return res.status(404).send({ Status: false, message: "token is not valid" })
        // }

    }
    catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }
}

const Mid2 = async function (req, res, next) {
    try {
        let query = req.query
        let header = req.headers

        let token = header['x-api-key'] || header['X-API-KEY']

        if (!token) {
            return res.status(400).send({ Status: false, message: " Please enter the token" })
        }

        if (Object.keys(query).length === 0) {
            return res.status(400).send({ Status: false, message: " Sorry query can't be empty" })
        }

        if (query.userId && query.category || query.userId && query.subcategory || query.subcategory && query.category) {

            let CheckBooks = await BookModel.findOne({ $or: [{ userId: query.userId, category: query.category }, { userId: query.userId, subcategory: query.subcategory }, { subcategory: query.subcategory, category: query.category }] })

            if(!CheckBooks){
                return res.status(400).send({ Status: false, message: "Book does not exist" });
            }

            // let CheckUser = await userModel.findOne({ _id: CheckBooks.userId });
            // if (!CheckUser) {
            //     return res.status(400).send({ Status: false, message: "user id not found" });
            // }

            let Decode_token = jwt.verify(token, "FunctionUp Group55")

            console.log("decode token    ", Decode_token)

            if (Decode_token) {
                if (Decode_token.UserId != CheckBooks.userId) {
                    return res.status(400).send({ Status: false, message: "This is not valid token for this User/Books" })
                }
                return next()
            }
        }
        else{
            return res.status(400).send({ Status: false, message: "Data are not in valid combination form from query" })
        }


    }
    catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }
}

module.exports.Mid1 = Mid1
module.exports.Mid2 = Mid2