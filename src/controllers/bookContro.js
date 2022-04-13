const { count } = require("console");
const BookModel = require("../models/bookMod");

const createBook = async function (req, res) {
  let data = req.body;

  let savedData = await BookModel.create(data);
  res.send({ msg: savedData });
};
const bookList = async function (req, res) {
  let everyBook =req.body
  let allBook = await BookModel.find(everyBook ); //and, means dono hona hi chahiy
  res.send({ msg: allBook });
};

const getBookInYear = async function (req, res) {
   let years = req.body.year;
  let listOfBook = await BookModel.find({year:years});
  res.send({ msg: listOfBook });
};

const getParticularBooks = async function (req, res) {
  let condition = req.body;
  let  particularThink = await BookModel.find(condition);

  res.send({ msg:particularThink });
};

const getXINRBooks = async function (req, res) {
    let allBooks = await BookModel.find( { 'price.indianPrice': { $in: ["100INR", "200INR", "500INR"] } } )
     res.send({ msg: allBooks })
};

const getRandomBooks = async function (req, res) {
  let pagesOfBook = await BookModel.find({
    $or: [{ stockAvalable: "true" }, { totalPages: { $gt: "500" } }],
  });
  res.send({ msg: pagesOfBook });
};
module.exports.createBook = createBook;
module.exports.bookList = bookList;
module.exports.getBookInYear = getBookInYear;
module.exports.getParticularBooks = getParticularBooks;
module.exports.getXINRBooks = getXINRBooks;
module.exports.getRandomBooks = getRandomBooks;
