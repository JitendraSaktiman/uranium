const authorModel = require("../models/authorModel");
const bookModel = require("../models/bookModel");
const publiserModel = require("../models/publiserModel")
// const { validate } = require("../models/authorModel");


const createBook = async function (req, res) {
  let book = req.body;

  let authorValidation = await authorModel.findById({_id:book.author_id})
 
  let PubliserValidation = await  publiserModel.findById({_id:book.publiser_id});

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
  
  let priceUp = await bookModel.updateMany( {array} , {$inc:{price:20}},{new:true})
  res.send({msg:priceUp})
 }


module.exports.createBook = createBook;
module.exports.getBooksData = getBooksData;
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails;
module.exports.updateBook = updateBook;
module.exports.ratUp = ratUp;

//try to solve
// if (book.author_id) {
//     let bookCreated = await bookModel.create(book);
//     res.send({ data: bookCreated });
// //   } else {
//     // res.send("Author_id is required")
//     Create a new PUT api /books and perform the following two operations
//  a) Add a new boolean attribute in the book schema called isHardCover with a default false value. For the books published by 'Penguin' and 'HarperCollins', update this key to true.
//  b) For the books written by authors having a rating greater than 3.5, update the books price by 10 (For eg if old price for such a book is 50, new will be 60) 


// {author_id:id
//   const id = array.map(x => x._id)
//   console.log(id) 