const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const router = express.Router();
 
const userController= require("../controllers/userController")
const mid= require("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser)

router.post("/login", userController.loginUser)


//The userId is sent by front end
router.get("/users/:userId", mid.validateToken, userController.getUserData)

router.post("/users/:userId/posts", userController.postMessage)

router.put("/users/:userId",mid.validateToken,mid.authenticate, userController.updateUser)
router.delete('/users/:userId',  userController.deleteData)

module.exports = router;