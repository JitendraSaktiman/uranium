const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")
const BookContro = require("../controllers/bookContro")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

// router.post("/createUser", UserController.createUser  )

// router.get("/getUsersData", UserController.getUsersData)

// router.post("/createBook", BookController.createBook  )

// router.get("/getBooksData", BookController.getBooksData)

router.post("/createBook", BookContro.createBook)

router.get('/bookList', BookContro.bookList)

router.post("/getBookInYear", BookContro.getBookInYear)

router.get("/getParticularBooks", BookContro.getParticularBooks)

router.get("/getXINRBooks",BookContro.getXINRBooks)

router.get("/getRandomBooks", BookContro.getRandomBooks)


module.exports = router;