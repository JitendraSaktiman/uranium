const jwt = require('jsonwebtoken');
const blogModel = require("../models/blogModel");

// Authentication
const Authentication = async function (req, res, next) {
    try {
        // getting token from req(header)
        let token = req.headers["x-api-key"];
        if (!token) token = req.headers["X-Api-Key"];
        if (!token) {
            return res.status(400).send({ Error: "Enter x-api-key In Header" });
        }

        // token verification
        let checktoken = jwt.verify(token, "BloggingSiteProject");
        if (!checktoken) {
            return res.status(404).send({ Status: false, msg: "Enter Valid Token" });
        }
        else {
            console.log("Token Verified");
        }
        next();
    }
    catch (err) {
        res.status(500).send({ msg: err.message });
    }
}
module.exports.Authentication = Authentication;

// Authori
const Authorization = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) token = req.headers["X-Api-Key"]
        if (!token) {
            return res.status(400).send({ Error: "Enter x-api-key In Header" });
        }
        let decodedToken = jwt.verify(token, "BloggingSiteProject")
        let blogId = req.params.blogId;

        if (blogId.length < 24) {
            return res.status(404).send({ msg: "Enter Valid Blog-Id" });
        }
        let decoded = decodedToken.authorid
        let blog = await blogModel.findById(blogId);
        if (!blog) {
            return res.send("Blog doesn't exist");
        }
        let author = blog.authorId.toString()
        console.log(author)
        if (author != decoded) {
            return res.status(404).send("Not Authorised!!")
        }
        next()
    }
    catch (err) {
        return res.status(500).send({ msg: err.message });
    }
}
module.exports.Authorization = Authorization;


const qauth = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) token = req.headers["X-Api-Key"]
        if (!token) {
            return res.status(400).send({ Error: "Enter x-api-key In Header" });
        }
        let decodedToken = jwt.verify(token, "BloggingSiteProject")
        let authorId = req.query.authorId;

        if (authorId.length < 24) {
            return res.status(404).send({ msg: "Enter Valid Blog-Id" });
        }
        let decoded = decodedToken.authorid
        let blog = await blogModel.findOne({authorId:authorId});
        if (!blog) {
            return res.send("Blog doesn't exist");
        }
        let author = blog.authorId.toString()
        console.log(author)
        if (author != decoded) {
            return res.status(404).send("Not Authorised")
        }
        next()
    }
    catch (err) {
        return res.status(500).send({ msg: err.message });
    }
}
module.exports.qauth = qauth;