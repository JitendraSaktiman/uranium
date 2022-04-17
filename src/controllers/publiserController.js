const PubliserModel= require("../models/publiserModel")

const createPubliser= async function (req, res) {
    let publiser = req.body
    let publiserCreated = await PubliserModel.create(publiser)
    res.send({data: publiserCreated})
}

const getPubliserData= async function (req, res) {
    let publiser = await PubliserModel.find()
    res.send({data: publiser})
}
 
module.exports.createPubliser= createPubliser
module.exports.getPubliserData= getPubliserData