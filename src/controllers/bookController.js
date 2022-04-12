
const BookModel= require("../models/bookModel")

    const createNewBooks= async function (req, res) {
        let data= req.body
        let saveData= await BookModel.create(data)
        res.send({msg: saveData})
    }


const allBookList= async function (req, res) {
    let bookList = await BookModel.find()
    res.send({msg: bookList})
} 



module.exports.createNewBooks= createNewBooks
module.exports.allBookList= allBookList 