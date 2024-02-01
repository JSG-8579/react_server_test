const express = require('express');
const fs = require('fs');
const app = express();
var cors = require('cors')
var bodyParser = require('body-parser')
require('dotenv').config({path: '.env'});
const test = require('./router/test.js')
const push = require('./router/push.js')
// let data = JSON.parse(fs.readFileSync('./data.json'));


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', test.testRouter)
app.use('/push', push)

// app.listen(3001, function () {
//   console.log('listening on 3001')
// }); 

app.listen(3030, test.dbConnect);