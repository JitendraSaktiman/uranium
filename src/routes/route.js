const express = require("express");
const logger = require("./logger");

const router = express.Router();

// problam is that find a missing number of an arrary

 

// problam 1
let arr = [
  "dark knight",
  "jai bhim",
  "kgf",
  "the age of tomorrow",
  "forestgum",
  "maharshi",
];

router.get('/GET-movie', function (req, res) {
  res.send(arr[0]);
});

// // adding this comment for no reason
// // solution of problam no.2 and 3

// // router.get("movie/:indexNumber", function (req, res) {
// //   let mov = Number(req.params.indexNumber);

// //   if (mov >= arr.length) {
// //     res.send("use a valid index ");
// //   } else {
// //     res.send(arr[mov]);
// //   }
// // });
// // //  adding this comment for no reason
// // // solution of problam no 4

let obj = [
  {
    id: 1,
    name: "The Shining",
  },
  {
    id: 2,
    name: "Incendies",
  },
  {
    id: 3,
    name: "Rang de Basanti",
  },
  {
    id: 4,
    name: "Finding Nemo",
  },
];
router.get("/film", function (req, res) {
  res.send(obj);
});
// // no reason
// // solution of problam no 5

// //    router.get('/films/:filmld', function (req, res){
// //        let result='invalid id'

// //        let movid = Number(req.params.filmld)

// //        for(let i = 0; i<obj.length; i++){
// //            if(obj[i].id==movid){
// //                result = "id" = "+obj[i].id+ " +" Name = "+obj[i].name;
// //            }

// //        }
// //        res.send(result);
// //    });

router.get('/films/:filmld', function (req, res) {
  let movid = Number(req.params.filmld);
  const rest = obj.find((x, index) => x.id == movid);
  if (!rest) {
    res.send("No movie exist with this id");
  } else {
    res.send("id = " + rest.id + " " + "Name =" + rest.name);
  }
});


module.exports = router;
// adding this comment for no reason
