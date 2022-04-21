const req = require("express/lib/request")
const productModel= require("../models/productModel")

// const  createProduct = async function(req, res) {
//     let tokenDataInHeaders= req.headers.token
//     console.log(tokenDataInHeaders)
//     //counter
//     console.log( "HEADER DATA ABOVE")
//     console.log( "hey man, congrats you have reached the Handler")
//     res.send({ msg: "This is coming from controller (handler)"})
    
//     }

const createProduct = async function(req, res){
    let data = req.headers
    let prodata = await productModel.create(data)
    console.log(data)
    res.send({msg:prodata}) 
}








    
module.exports.createProduct = createProduct
 

