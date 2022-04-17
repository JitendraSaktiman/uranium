const authorModel = require("../models/authorModel");
const bookModel = require("../models/bookModel");
const publiserModel = require("../models/publiserModel")
// const { validate } = require("../models/authorModel");


const createBook = async function (req, res) {
  let book = req.body;

  let authorValidation = await authorModel.findOne({_id:book.author_id})
 
  let PubliserValidation = await  publiserModel.findOne({_id:book.publiser_id});

  if (!book.author_id) {
        res.send({msg:"Author_id is required"})
    }
    
     if(!authorValidation){
           res.send({msg:"Author_id is not valid"})
    } 
    
    
    if(!book.publiser_id){
       res.send({msg:"publiser_id is required"})
  }
  
   if(!PubliserValidation){
    res.send({msg:"publiser_id is not valid"})
  }
  
  else {
    let bookCreated = await bookModel.create(book);
    res.send({ data: bookCreated });
}
  
};

const getBooksData = async function (req, res) {
  let books = await bookModel.find();
  res.send({ data: books });
};

const getBooksWithAuthorDetails = async function (req, res) {
  let specificBook = await bookModel.find() .populate("author_id publiser_id");
  res.send({ data: specificBook });
};


const updateBook = async function(req, res){
  let array = await publiserModel.find({publiser:{$in:["Penguin", "HarperCollins" ]}})
  let idOne= array[0]._id
  let idTwo = array[1]._id
  // console.log(idTwo)
  let upd = await bookModel.updateMany({$or:[{publiser_id:idOne }, {publiser_id:idTwo}]}, {$set:{isHardCover:true}} ,{new:true})
  
  res.send({msg: upd });
};

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
 