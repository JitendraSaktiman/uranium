const validateEmail = require('email-validator');
const authorModel = require('../models/authorModel');

// validation
const validateAuthor = async function (req, res, next) {
    try {
        let data = req.body;
        const { fname, lname, title, email, password } = data

        if (Object.keys(data).length != 0) {
            if (data.fname === undefined) {
                return res.status(400).send({ status: false, msg: "FirstName Required " });
            }
            if (data.lname === undefined) {
                return res.status(400).send({ status: false, msg: "LastName Required " });
            }
            if (data.title === undefined) {
                return res.status(400).send({ status: false, msg: "Title Required " });
            }
            if (data.email === undefined) {
                return res.status(400).send({ status: false, msg: "Email Required " });
            }
            if (data.password === undefined) {
                return res.status(400).send({ status: false, msg: "Password Required " });
            }
        }
        else {
            return res.status(400).send({ msg: "Mandatory field Missing!!" })
        }
        
        if(!validateEmail.validate(data.email)) return res.status(400).send({ status: false, msg: "Enter a valid email" })

        if (Object.values(fname).length <= 0) {
            return res.status(400).send({status:false,msg:"The fName is required"});
        }
        if (Object.values(lname).length <= 0) {
            return res.status(400).send({status:false,msg:"The lName is required"});
        }
        if (Object.values(title).length <= 0) {
            return res.status(400).send({status:false,msg:"The title is required"});
        }
        if (Object.values(email).length <= 0) {
            return res.status(400).send({status:false,msg:"The email is required and unique"});
        }
        let author = await authorModel.findOne({email:email})
        if(author){
            return res.status(400).send({status:false,msg:"This email is already exists"});
        }
        if (Object.values(password).length <= 0) {
            return res.status(400).send({status:false,msg:"The password is required"});
        } else {
            next()
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}
module.exports.validateAuthor = validateAuthor;

 //valitation
const validateblog = async function (req, res, next) {
    try {
        let data = req.body
        const { title, body, authorId, category } = data

        if (Object.keys(data).length != 0) {
            if (data.title === undefined) {
                return res.status(400).send({ status: false, msg: "Title missing" });
            }
            if (data.body === undefined) {
                return res.status(400).send({ status: false, msg: "Blog Body required" });
            }
            if (data.authorId === undefined) {
                return res.status(400).send({ status: false, msg: "AuthrId is Required" });
            }
            if (data.category === undefined) {
                return res.status(400).send({ status: false, msg: "Category is Required" });
            }
        }
        else {
            return res.status(400).send({status:false, msg: "Mandatory field Missing" });
        }

        if (Object.values(title).length <= 0) {
            return res.status(400).send({status:false, msg:"Title Missing"});
        }
        if (Object.values(body).length <= 0) {
            return res.status(400).send({status:false,msg:"Body missing"});
        }
        if (Object.values(authorId).length <= 0) {
            return res.status(400).send({status:false, msg:"AuthorId missing"});
        }

        let authorid = await authorModel.findById(authorId)
        if (!authorid) {
            return res.status(400).send({status:false, msg:'Enter Valid AuthorId'});
        }
        if (Object.values(category).length <= 0) {
            return res.status(400).send({status:false, msg:"Category Missing"});
        } else {
            next()
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}
module.exports.validateblog = validateblog;
