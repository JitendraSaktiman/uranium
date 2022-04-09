const express = require('express');
const req = require('express/lib/request');

const router = express.Router();
// const randomController = require("../controllers/randomController");
const assignment = require("../assignments/assignment")

// router.post('/test-me', function (req, res) {
//      let a = { msg: "My first ever API response in JSON !!"} 
//      let b = { test: " today i learn basic fundamental of js or node js api how ist work"}

//     res.send ( a )
//     console.log(b)
// });
 



// router.get('/test-api1', function (req, res) {

//     res.send( "hi FunctionUp " )
// });


// router.get('/test-api2', function (req, res) {

//     res.send( { msg: "Hi FUnctionUp..again !"} )
// });


// router.get('/test-api3', function (req, res) {

//     res.send( { msg: "Hi FUnctionUp..again..this is another similar api !"} )
// });


// router.get('/test-api4', function (req, res) {

//     res.send( { msg: "Hi FUnctionUp..again..this is another similar api ..not I am getting fun !"} )
// });


// router.get('/test-api5', function (req, res) {

//     res.send( { msg: "Hi FUnctionUp" , name:"FunctionUp", age: "100"} )
// });


// router.get('/test-case-api', function (req, res) {

//     res.send( { test: "my rist ever get api making by me" } ) 
// });


// router.get('/test-api6', function ( req, res ) {

//     res.send( { data:  [12, 24, 36, 48, 60,]  }   )
// });


// router.post('/test-post1', function (req, res) {

//     let data = req.body
//     console.log(data)
//     res.send( { msg: "hi guys all good " } )
// });


// // to send data in  post request-> prefer sending in BODY -> click body-raw-json
// router.post('/test-post2', function (req, res) {
//     let data= req.body
//     console.log(data)
       
//     res.send( {  msg: "hi guys..my 2nd post req"  }   )
// // });
// const randomController= require("../controllers/randomController.js")
// router.post('/munna', randomController.play);


// const randomController= require("../controllers/randomController.js")
// //write a post request to accept an element in post request body and add it to the given array and return the new array
// router.post('/test-post3', randomController.addToArray ); //HANDLER/CONTROLLER

// const randomController = require("../controllers/randomController")



router.post('/player-Arr',assignment.playerArr);

module.exports = router;
