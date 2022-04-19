const batchModel = require("../models/batchModel")
const devloperModel= require("../models/devloperModel")

const createDevlopers= async function (req, res) {
    let book = req.body
    let devloperCreated = await devloperModel.create(book)
    res.send({data: devloperCreated})
}

const scholarshipDevelopers = async function (req, res) {
    let scholerDev = await devloperModel.find({$and:[{gender:"female"},{percentage:{$gte:70}}]}).populate('batch')
    res.send({msg:scholerDev})
}

const developers  = async function (req, res) {
    let query1 = req.query.percentage
    let query2 = req.query.program
    let returnDevlo = await devloperModel.find({percentage:{$gte:query1}} ).populate('batch');
        res.send({msg:returnDevlo})
      
    // let devBatch= await batchModel.find({program:query2})
    //   let data = devBatch.map(x =>x._id)
    //   if(query1){
    //       if(query2){
    //           let result = await devloperModel.find({$and:[{percentage:{$gte:query1}} ,{batch:data}]}).populate('batch')
    //           res.send({result})
    //       }else {
    //           res.send({result:' must be a program '})
    //       }
    //     }
    //     // else
    //     //   {
    //     //       res.send({result:'percentage not available'})
    //     //   }
 }
     

module.exports.createDevlopers= createDevlopers
module.exports. scholarshipDevelopers=  scholarshipDevelopers
module.exports. developers  = developers 
