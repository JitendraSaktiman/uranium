// let addToArray= function (req, res) {
//     let x= req.body.number
//     console.log(x)
//     let arr= [2, 5, 11, 14]
//     arr.push(x)
//     res.send( {  msg: "post req 3", data: arr  } )
// }

//  let play = function (req, res){
 
//     let y = req.body
//     console.log(y)
//     let arr = [445,6,6,85,74,322,55]
//     arr.push(y)
//     console.log(arr)
    
//     res.send({kuch:  " post req", data: arr})
// }
  

    let playerArr = [
        { 
            "name": "manish",
            "dob": "1/1/1995",
            "gender": "male",
            "city": "jalandhar",
            "sports": [
                "swimming"
            ]
        },

        {
            "name": "gopal",
            "dob": "1/09/1995",
            "gender": "male",
            "city": "delhi",
            "sports": [
                "soccer"
            ]
        },
        {
            "name": "lokesh",
            "dob": "1/1/1990",
            "gender": "male",
            "city": "mumbai",
            "sports": [
                "soccer"
            ]
        },
    ]
 

   

// module.exports.addToArray= addToArray
// module.exports.play=play
module.exports.playerArr= playerArr