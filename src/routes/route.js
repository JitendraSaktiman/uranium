const express = require('express');
const router = express.Router();

const userController= require("../controllers/userController")
const BookController= require("../controllers/bookController")
const ReviewController= require("../controllers/reviewController")
const Middleware = require("../Middleware/Authentication")


//------------------------------USER API -----------------------------------***

router.post("/register",userController.Createuser)

router.post('/login', userController.login)

// ---------------------------BOOK API -------------------------------------***

router.post('/books',Middleware.Mid1,BookController.Bookcreate)

router.get('/books',Middleware.Mid1,BookController.GetBook)

router.get('/books/:bookId',Middleware.Mid1,Middleware.Mid2,BookController.resultBook)

router.put("/books/:bookId",Middleware.Mid1,Middleware.Mid2,BookController.UpdateBook)

router.delete("/books/:bookId",Middleware.Mid1,Middleware.Mid2,BookController.DeleteBook)

//-----------------------------REVIEW API ----------------------------------***

router.post('/books/:bookId/review',ReviewController.CreateReview)

router.put('/books/:bookId/review/:reviewId',ReviewController.ReviewUpdate)

router.delete('/books/:bookId/review/:reviewId',ReviewController.ReviewDelete)


module.exports = router;