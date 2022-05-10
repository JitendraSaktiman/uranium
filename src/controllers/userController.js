const usermodel = require('../models/userModel')
const validator = require('../Middleware/validator');

const jwt = require('jsonwebtoken')



const Createuser = async function (req, res) {

    try {
        let body = req.body

        if (Object.keys(body).length === 0) {
            return res.status(400).send({ Status: false, message: " Sorry Body can't be empty" })
        }
        if (!body.title) {
            return res.status(400).send({ Status: false, message: " Title is required" })
        }

        // Regex for name validation
        let nameRegex = /^[A-Za-z]{1}[A-Za-z ]{1,}$/
        if (!body.name) {
            return res.status(400).send({ Status: false, message: " name is required" })
        }
        if (!nameRegex.test(body.name)) {
            return res.status(400).send({ Status: false, message: " name is not in valid format" })
        }

        //regex for phone

        let Phoneregex = /^[6-9]{1}[0-9]{9}$/
        if (!body.phone) {
            return res.status(400).send({ Status: false, message: " phone is required" })
        }
        if (!Phoneregex.test(body.phone)) {
            return res.status(400).send({ Status: false, message: " Please enter a valid phone number, please use 10 digit phone number " })
        }

        let EmailRegex = /^[A-Za-z]{1}[A-Za-z0-9._]{1,}@[A-Za-z]{2,15}[.]{1}[a-z.]{2,5}$/

        if (!body.email) {
            return res.status(400).send({ Status: false, message: " email is required" })
        }
        if (!EmailRegex.test(body.email)) {
            return res.status(400).send({ Status: false, message: " Please enter a valid email" })
        }

        // Email and phone unique condition

        let Checkuniquedata = await usermodel.findOne({ $or: [{ email: body.email }, { phone: body.phone }] })
        if (Checkuniquedata) {
            if (Checkuniquedata.phone == body.phone) {
                return res.status(400).send({ Status: false, message: " This phone has been used already" })
            }
            if (Checkuniquedata.email === body.email) {
                return res.status(400).send({ Status: false, message: " This email has been used already" })
            }
        }

        let Passwordregex = /^[A-Z0-9a-z]{1}[A-Za-z0-9.@#$&_]{7,14}$/

        if (!body.password) {
            return res.status(400).send({ Status: false, message: " password is required" })
        }
        if (!Passwordregex.test(body.password)) {
            return res.status(400).send({ Status: false, message: " Please enter a valid password, minlength 8, maxxlength 15" })
        }
        // regex for street 

        let StreeRegex = /^[A-Za-z1-9]{1}[A-Za-z0-9/ ,]{5,}$/

        let PinCodeRegex = /^[1-9]{1}[0-9]{5}$/

        if (body.address) {
            if (!StreeRegex.test(body.address.street)) {
                return res.status(400).send({ Status: false, message: " Please enter a valid street address" })
            }
            if (!nameRegex.test(body.address.city)) {
                return res.status(400).send({ Status: false, message: " Please enter a valid city name" })
            }
            if (!PinCodeRegex.test(body.address.pincode)) {
                return res.status(400).send({ Status: false, message: " Please enter a valid pincode of 6 digit" })
            }
        }
        if (body.title === "Mr" || body.title === "Miss" || body.title === "Mrs") {

            let userCreate = await usermodel.create(body)
            return res.status(201).send({ Status: true, message: 'Success', data: userCreate })
        }
        return res.status(400).send({ Status: false, message: " Please enter a valid title you can use only anyone from these Mr/Miss/Mrs" })
    }
    catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }

}




const login = async function (req, res) {

    try {
        let body = req.body

        if (Object.keys(body).length === 0) {
            return res.status(400).send({ Status: false, message: " Sorry Body can't be empty" })
        }

        // regex validation
        let EmailRegex = /^[A-Za-z]{1}[A-Za-z0-9._]{1,}@[A-Za-z]{2,15}[.]{1}[a-z.]{2,5}$/
        let Passwordregex = /^[A-Z0-9a-z]{1}[A-Za-z0-9.@#$&]{7,14}$/

        // Email validation

        if (!body.email) {
            return res.status(400).send({ Status: false, message: " email is required" })
        }
        if (!EmailRegex.test(body.email)) {
            return res.status(400).send({ Status: false, message: " Please enter a valid email" })
        }

        // password validation

        if (!body.password) {
            return res.status(400).send({ Status: false, message: " password is required" })
        }
        if (!Passwordregex.test(body.password)) {
            return res.status(400).send({ Status: false, message: " Please enter a valid password, minlength 8, maxxlength 15" })
        }

        // checking User Detail

        let CheckUser = await usermodel.findOne({ email: body.email, password: body.password });

        if (!CheckUser) {
            return res.status(400).send({ Status: false, message: "username or the password is not correct" });
        }

        // let user_token = jwt.sign({

        //     exp: Math.floor(Date.now() / 1000) + (60 * 60),     //Signing a token with 1 hour of expiration
        //     UserId: CheckUser._id

        // }, 'FunctionUp Group55');

        let user_token = jwt.sign({

            UserId: CheckUser._id

        }, 'FunctionUp Group55', { expiresIn: '24h' });



        res.setHeader("x-api-key", user_token);
        return res.status(201).send({ status: true, data: user_token });
    }
    catch (err) {
        return res.status(500).send({ Status: false, message: err.message })
    }
}



module.exports.Createuser = Createuser
module.exports.login = login;
