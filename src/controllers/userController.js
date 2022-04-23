const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const mid = require("../middleware/auth")

const createUser = async function (req, res) {
  try{
  let data = req.body;
  if ( Object.keys(data).length != 0) {
  let savedData = await userModel.create(data);
  res.status(201).send({status:true, msg: savedData });
  }
else res.status(400).send({ msg: "BAD REQUEST"})
}
catch(err){
  console.log("This is the error :", err.message)
  res.status(500).send({ msg: "Error", error: err.message })
}
};

const loginUser = async function (req, res) {
  try{
  let userName = req.body.emailId;
  let password = req.body.password; 
   if ( Object.keys({userName,password}).length != 0) {
  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    });

  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret
  // The same secret will be used to decode tokens
  let token = jwt.sign(
    {                                  //payload
      userId: user._id.toString(),
      batch: "uranium",
      organisation: "FUnctionUp",
    },
    "functionup-uranium"  //secret code signature
  );
  res.setHeader("x-auth-token", token);
  res.status(201).send({ status: true, data: token });
  }
   else res.status(400).send({ msg: "BAD REQUEST"})
}
catch(err){
  console.log("This is the error :", err.message)
  res.status(500).send({ msg: "Error", error: err.message })
}
};

const getUserData = async function (req, res) {
//   let token = req.headers["x-Auth-token"];
//   if (!token) token = req.headers["x-auth-token"]; //heder is caseinsenstive

//   //If no token is present in the request header return error
//   if (!token) return res.send({ status: false, msg: "token must be present" });

//   console.log(token);
  
// //   // If a token is present then decode the token with verify function
// //   // verify takes two inputs:
// //   // Input 1 is the token to be decoded
// //   // Input 2 is the same secret with which the token was generated
// //   // Check the value of the decoded token yourself
//   let decodedToken = jwt.verify(token, "functionup-thorium",( err, decodedToken)=>{

//    if (!decodedToken)
//     return res.send({ status: false, msg: "token is invalid" });
  

  let userId = req.params.userId;
   
  let userDetails = await userModel.findById(userId);
  if (!userDetails){
    return res.send({ status: false, msg: "No such user exists" });
  }

   res.send({status:true, msg:userDetails})
  
};
 
const updateUser = async function (req, res) {
// Do the same steps here:
// Check if the token is present
// Check if the token present is a valid token
// Return a different error message in both these cases
try{
  let userId = req.params.userId;
   
  let user = await userModel.findById(userId);
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.send({staus:false, msg:"No such user exists"});
  }
  
  let userData = req.body;
  if ( Object.keys(userId).length != 0) {
  let updatedUser = await userModel.findByIdAndUpdate({ _id: userId },userData, {new:true})
  res.status(201).send({ status:true, data: updatedUser });
 }
  
  else res.status(400).send({ msg: "BAD REQUEST"})
 
}
   catch(err){
       console.log("This is the error :", err.message)
       res.status(500).send({ msg: "Error", error: err.message })
   }

};
const postMessage = async function (req, res) {
 
    let message = req.body.message
    
    // Check if the token is present
    // Check if the token present is a valid token
    // Return a different error message in both these cases
    let token = req.headers["x-auth-token"] || req.headers["x-Auth-Token"]
    if(!token) return res.send({status: false, msg: "token must be present in the request header"})
    let decodedToken = jwt.verify(token, 'functionup-uranium')
   console.log(decodedToken)
    if(!decodedToken) return res.send({status: false, msg:"token is not valid"})
    
    //userId for which the request is made. In this case message to be posted.
    let userToBeModified = req.params.userId
    //userId for the logged-in user
    let userLoggedIn = decodedToken.userId

    //userId comparision to check if the logged-in user is requesting for their own data
    if(userToBeModified != userLoggedIn) return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})

    let user = await userModel.findById(userToBeModified)
    if(!user)
     return res.send({status: false, msg: 'No such user exists'})
    let updatedPosts = user.posts
    //add the message to user's posts
    updatedPosts.push(message)
    let updatedUser = await userModel.findOneAndUpdate({_id:userToBeModified},{posts: updatedPosts}, {new: true})

    //return the updated user document
    return res.status(200).send({status: true, data: updatedUser})
    

}
  

const deleteData= async function(req, res){
  try{
  let userId = req.params.userId
  if ( Object.keys(userId).length != 0) {
  let user = await userModel.findById(userId)
   
  if(!user){
    return res.send({msg:"no such user exist"})
  }
  const updatedUser =  await userModel.findOneAndUpdate({_id:userId},{isDeleted:true}, {new:true})
  res.status(201).send({status:true, data:updatedUser})
  }
else res.status(400).send({ msg: "BAD REQUEST"})
  }
catch(err){
  res.status(500).send({ msg: "Error", error: err.message })
}
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData; 
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.postMessage = postMessage
module.exports.deleteData=deleteData
