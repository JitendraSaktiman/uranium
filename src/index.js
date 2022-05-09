const express = require('express')
const bodyParser = require('body-parser')

const route = require('./routes/route')

const { default: mongoose } = require('mongoose');
const { urlencoded } = require('express');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extends: true }))

mongoose.connect("mongodb+srv://jitendra:p8CWfHiiLHJsBcc4@cluster0.ar02m.mongodb.net/group55Database", { useNewUrlParser: true })

    .then(() => console.log('mongodb is connected'))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
