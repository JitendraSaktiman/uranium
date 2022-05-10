const express = require('express');
const router = express.Router();

const userController= require("../controllers/userController")
const BookController= require("../controllers/bookController")
const Middleware = require("../Middleware/Authentication")



router.post("/register",userController.Createuser)


router.post('/login', userController.login)

router.post('/books',Middleware.Mid1,BookController.Bookcreate)

router.get('/books',Middleware.Mid2,BookController.GetBook)


module.exports = router;