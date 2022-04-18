const authorModel = require("../models/authorModel");
const bookModel = require("../models/bookModel");
const publiserModel = require("../models/publiserModel")
// const { validate } = require("../models/authorModel");


const createBook = async function (req, res) {
  let book = req.body;

  // let authorValidation = await authorModel.findById({_id:book.author_id})
 
  // let PubliserValidation = await  publiserModel.findById({_id:book.publiser_id});
// 1
  if (!book.author_id) {
       return res.send({msg:"Author_id is required"})
    }
    
    let authorValidation = await authorModel.findById({_id:book.author_id})
     if(!authorValidation){
         return  res.send({msg:"Author_id is not valid"})
    } 
    
    
    if(!book.publiser_id){
      return res.send({msg:"publiser_id is required"})
      }
  
  let PubliserValidation = await  publiserModel.findById({_id:book.publiser_id});

   if(!PubliserValidation){
     return  res.send({msg:"publiser_id is not valid"})
  }
  
   {
    let bookCreated = await bookModel.create(book);
    res.send({ data: bookCreated });
   }
  
};
// 2
const getBooksData = async function (req, res) {
  let books = await bookModel.find();
  res.send({ data: books });
};
// 3
const getBooksWithAuthorDetails = async function (req, res) {
  let specificBook = await bookModel.find() .populate("author_id publiser_id");
  res.send({ data: specificBook });
};

// 4
const updateBook = async function(req, res){
  let array = await publiserModel.find({publiser:{$in:["Penguin", "HarperCollins" ]}})
  let idOne= array[0]._id
  let idTwo = array[1]._id
  // console.log(idTwo)
//  let id = []
 //for(let i=0; i<array; i++)

  let upd = await bookModel.updateMany({$or:[{publiser_id:idOne }, {publiser_id:idTwo}]}, {$set:{isHardCover:true}} ,{new:true})
  
  res.send({msg: upd });
};
// 5
const ratUp =async function(req, res){

  let array = await authorModel.find({rating:{$gt:3.5}} )
  
  let priceUp = await bookModel.updateMany( {array} , {$inc:{price:10}},{new:true})
  res.send({msg:priceUp})
 }


module.exports.createBook = createBook;
module.exports.getBooksData = getBooksData;
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails;
module.exports.updateBook = updateBook;
module.exports.ratUp = ratUp;
 