const UserModel= require("../models/userModel")

// const createUser= async function (req, res) {
//     let data= req.body
//     let savedData= await UserModel.create(data)
//     res.send({msg: savedData})
// }

// const getUsersData= async function (req, res) {
//     let allUsers= await UserModel.find()
//     res.send({msg: allUsers})
// }


    const createNewBooks= async function (req, res) {
        let data= req.body
        let saveData= await UserModel.create(data)
        res.send({msg: saveData})
    }


const allBookList= async function (req, res) {
    let bookList = await UserModel.find()
    res.send({msg: bookList})
}

module.exports.createNewBooks= createNewBooks
module.exports.allBookList= allBookList 
// module.exports.createUser= createUser
// module.exports.getUsersData= getUsersData