const batchModel= require("../models/batchModel")

const createBatches= async function (req, res) {
    let batch = req.body
    let batchCreated = await batchModel.create(batch)
    res.send({data: batchCreated})
}
 

module.exports.createBatches= createBatches
 