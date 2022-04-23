const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const validateToken = async function(req, res, next){
let token = req.headers["x-Auth-token"];
if (!token) token = req.headers["x-auth-token"]; //heder is caseinsenstive

//If no token is present in the request header return error
if (!token) return res.send({ status: false, msg: "token must be present" });

console.log(token);

// If a token is present then decode the token with verify function
// verify takes two inputs:
// Input 1 is the token to be decoded
// Input 2 is the same secret with which the token was generated
// Check the value of the decoded token yourself
let decodedToken = jwt.verify(token, "functionup-thorium", ( err, decodedToken)=>{
    

 if (!decodedToken){
  return res.send({ status: false, msg: "token is invalid" });
 }
 
next()
});
}



const authenticate = function(req, req, next) {
    //check the token in request header
    //validate this token

    next()
}


const authorise = async function(req, res, next) {
    // comapre the logged in user's id and the id in request
     
 
    next()
}

module.exports.authenticate=authenticate
module.exports.authorise=authorise
module.exports.validateToken=validateToken