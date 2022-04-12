const express = require('express');
const router = express.Router();
const bookModel= require('../controllers/bookController')
const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
});

// router.post("/createUser", UserController.createUser  )

// router.get("/getUsersData", UserController.getUsersData)

router.post("/createNewBooks",BookController.createNewBooks)

router.get('/allBookList', BookController.allBookList)
  
module.exports = router;