const express = require("express");
const bodyParser = require('body-parser');
const route = require('./route/router')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const PORT = 3000;

app.use(bodyParser.json())
app.use(cors())

mongoose.connect("mongodb+srv://Keshav-cyber:7LizqrsG6tL39fuT@cluster0.ohm0bak.mongodb.net/newDB?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route)

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});