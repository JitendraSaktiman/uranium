const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const validateToken = async function(req, res, next){
let token = req.headers["x-Auth-token"];
if (!token) token = req.headers["x-auth-token"]; //heder is caseinsenstive

//If no token is present in the request header return error
if (!token) {
    return res.send({ status: false, msg: "token must be present" });
}
 

// If a token is present then decode the token with verify function
// verify takes two inputs:
// Input 1 is the token to be decoded
// Input 2 is the same secret with which the token was generated
// Check the value of the decoded token yourself

// // try{jwt.verify(token, "function-uranium")}
// // catch(err){return res.send({status:true, msg: "token is invalid"})}

let decodedToken =jwt.verify(token, "functionup-uranium")
console.log(decodedToken.userId)
 if (!decodedToken){
  return res.send({ status: false, msg: "token is invalid" });
 }


next()
}




const authenticate = function(req, req, next) {
    //check the token in request header
    //validate this token

    next()
}


const authorise = async function(req, res, next) {
    // comapre the logged in user's id and the id in request
     if(decodedToken.userId != userId){
         res.status(401).send({status:true,msg:"user not authorise"})
     }
     
    next()
}

module.exports.authenticate=authenticate
module.exports.authorise=authorise
module.exports.validateToken=validateToken

// , ( err, decodedToken)=>{
    



    // const jwt = require("jsonwebtoken");

    // ///--------------- middleware for token verification 
    
    // let authMiddleWare = function (req , res , next){
    //     //console.log("innerAuth");
    //     try {
    //       let token = req.headers['x-Auth-token']
        
    //       if(!token) token = req.headers['x-auth-token']
    
    //       if(!token) return res.status(401).send({message: "token must be present" })
    
    //       let decodedToken = jwt.verify( token , "functionup-uranium")
    //       let userId = req.params.userId
    
    //       if(decodedToken.