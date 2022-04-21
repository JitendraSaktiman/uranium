const req = require("express/lib/request")
const orderModel = require("../models/orderModel")
const productModel= require("../models/productModel")
const userModel= require("../models/userModel")
 
let createOrder = async (req, res) => {
    let orderinfo = req.body
    const header = req.headers
    let userid = orderinfo.userid
    let productid = orderinfo.productid
    let userverification = await userModel.findOne({ _id: userid }).catch(err=> null)
    if (!userverification) {
        return res.send({ data: "Invalid userID !" })
    }
    let productverification = await productModel.findOne({ _id: productid }).catch(err=>null)
    if (!productverification) {
        return res.send({ data: "Invalid ProductID !" })
    }
    let productprice = 0
    if (header.isfreeappuser == "false") {
        if(userverification.balance<productverification.price){
            return res.send({data:"Insufficient balance !"})
        }
        await userschema.findOneAndUpdate({ _id: userid }, { $inc: { balance: -productverification.price } })
        productprice = productverification.price;
    }
    let orders={
        userId:userid,
        productId:productid,
        amount:productprice,
        isFreeAppUser:req.isfreeappuser
    }
    let data=await orderModel.create(orders)
    res.send({data:data})
}
 
module.exports.createOrder = createOrder;








    
// module.exports.createOrder = createOrder
