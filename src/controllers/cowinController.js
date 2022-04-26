let axios = require("axios")


let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body

        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getAnyDistricts = async function (req, res) {
    try {
        let district = req.query.district_id
        let date = req.query.date
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district}&date=${date}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

const londonWeather = async function (req, res) {
    try {
        let city = req.query.q
        let appid = req.query.appid
         let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

// then change the above to get the temperature only( of London)

const tempOfCity = async function (req, res) {

    try {
        let city = req.query.q
        let appid = req.query.appid
        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`
        }
        let result = await axios(options)
        console.log(result.data)
        let selectTemp = result.data.main.temp
        console.log(selectTemp)
        res.status(200).send({ status: true, data: selectTemp })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}



const cities = async function (req, res) {

    try {
        allCity = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let arr = []
        for (let i = 0; i < allCity.length; i++) {

            let city = { city: allCity[i] }


            var options = {
                method: "get",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${allCity[i]}&appid=a063e2f3038a830a3bf6202e239a82ae`
            }
            let result = await axios(options)

            city.temp = result.data.main.temp
            console.log(city)
            arr.push(city)
        }
        let compare = (a, b) => {
            if (a.temp > b.temp) { return 1 }
            if (a.temp < b.temp) { return -1 }
            return 0;
            
        }
        arr.sort(compare)
        res.status(200).send({data:arr})
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


const memes = async function (req, res) {
    try {
        template_id = req.query.template_id
        text0 = req.query.text0
        text1 = req.query.text1
        username = req.query.username
        password = req.query.password

        let options = {
            method: "post",
            url: `https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text0}&text1=${text1}&  username=${username}&password=${password}`
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

}










module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp
module.exports.getAnyDistricts = getAnyDistricts
module.exports.londonWeather = londonWeather
module.exports.cities = cities
module.exports.tempOfCity = tempOfCity
module.exports.memes = memes