const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const blogsController = require("../controllers/blogController");
const { validateAuthor, validateblog } = require('../middleware/valid');
const { Authentication, Authorization, qauth } = require('../middleware/auth');



// ------------------authors API------------------------- ---------
router.post("/authors", validateAuthor, authorController.createAuthor);

router.post('/login', authorController.authorLogin);

//--------------------blogs API--------------------------------- ------------

router.post("/blogs", Authentication, validateblog, blogsController.createBlog);

router.get("/blogs", Authentication, blogsController.getBlogs);

router.put("/blogs/:blogId", Authorization, blogsController.updateblogs);

router.delete("/blogs/:blogId", Authentication, Authorization, blogsController.deleteBlogs);

router.delete("/blogs", Authentication, qauth, blogsController.queryDeleted);


 

 
module.exports = router;