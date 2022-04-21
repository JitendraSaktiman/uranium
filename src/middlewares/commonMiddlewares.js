
// const UserController= require("../controllers/userController")
// const ProductController= require("../controllers/productController")
// const OrderController= require("../controllers/orderController")
// const userModel = require("../models/userModel")

let headerval= (req, res, next)=>{
     let data=req.headers
     let validinfo=data["isfreeappuser"]
     // console.log(validinfo)
     if(validinfo){
         if(validinfo=="true"){
             req.isfreeappuser=true
         }else{
             req.isfreeappuser=false
         }
         next();
     }else{
         res.send({data:"header missing"})
     }
     }
     
     module.exports.headerval=headerval;
     


// const mid1=  async function ( req, res, next) {
//      let check = req.headers.isFreeAppUser
  
//     if(check){
//        next()
//     } 
//     else{
//          res.send({msg:"must be present isFreeAppUser"})
//     }
 
// }

// module.exports.mid1= mid1
// // module.exports.mid2= mid2
// // module.exports.mid3= mid3
// // module.exports.mid4= mid4


// // // 