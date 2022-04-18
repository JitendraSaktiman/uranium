const { count } = require("console");
const AuthorModel = require("../models/authorModel");
const BookModel= require("../models/allBookModel");
// const authorModel = require("../models/authorModel");

const createAllBook= async function(req, res){

    let deta = req.body
    let savedData = await BookModel.create(deta)
    res.send({msg:savedData})
};

const createAuthor= async function(req, res){
    let data = req.body
    let saveData = await AuthorModel.create(data)
    res.send({msg:saveData})
};
const surchBook= async function(req, res){
    // let data= req.body
    let givenData = await AuthorModel.find({author_name:"Chetan Bhagat"}) 
    const id = givenData[0].author_id
    console.log(id)
    res.send(id)
    // const bkName= await BookModel.find({author_id:id}) .select({bookName:1})
    // res.send({msg:bkName})  
};

const getBookUpd = async function(req, res){
    // let data = req.query
    let obtainData = await BookModel.find({bookName:"Two states"})
    const id = obtainData[0].author_id
    const aName = await AuthorModel.find({author_id:id}).select({author_name:1, _id:0})
    const bkName = obtainData[0].bookName
    const upPrice= await BookModel.findOneAndUpdate({bookName:bkName}, {price:100},{new:true}).select({price:1, _id:0})

    res.send({msg:aName,upPrice})
};

const getBookCost =async function (req, res){
    
    let booksData = await BookModel.find({price: {$gte50,$lte:100}}) 
    const id = booksData.map(x => x.author_id)
    
    let temp = []
    for(let i =0;i<id.length;i++){
        let a = id[i]
        const author = await AuthorModel.find({author_id:a}).select({author_name:1, _id:0})
        temp.push(author)
    }
    const authorName= temp.flat()
    res.send({msg:authorName})
}



module.exports.createAllBook = createAllBook
module.exports.createAuthor=createAuthor
module.exports.surchBook=surchBook
module.exports.getBookUpd=getBookUpd
module.exports.getBookCost=getBookCost