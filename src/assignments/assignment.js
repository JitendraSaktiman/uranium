
let player =[
   
    {
        "name": "manish",
        "dob": "1/1/1995",
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
        ],
    },
    {
        "name": "lokesh",
        "dob": "1/1/1990",
        "gender": "male",
        "city": "mumbai",
        "sports": [
            "soccer"
        ],
    },
]
 const playerArr = function (req, res){
     let play = req.body
     let obj = { }
     let result = player.find(item=> item.name==play.name)
     if(result)
     {
          obj = {data:"player already exist",status:false}

     }else if(!result){
          player.push(play)
          obj={data:player, status:true}
     }
    res.send(obj)

 }

 module.exports.playerArr= playerArr
