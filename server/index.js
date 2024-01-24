const express = require('express');
const fs = require('fs');
const app = express();
var cors = require('cors')
var bodyParser = require('body-parser')
let data = JSON.parse(fs.readFileSync('./data.json'));

// console.log(bodyParser)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/test', function (req, res) {
    res.send(data.test)
})
//json의 test 부분 들고오기

app.get('/test/:id', function (req, res) {
    const {id} = req.params;
    const findData = data.test.find(obj=>obj.id==id)
    res.send(findData)
})

app.post('/test', function (req,res){
  const body = JSON.stringify({...data,test:[...data.test, req.body]})
  data.test.push(req.body)
  const dataInsert = fs.writeFileSync('./data.json', body)
  res.send(data.test)
})

app.delete('/test/:id', function(req, res){
  const {id} = req.params;
  data.test = data.test.filter(obj=>obj.id != id)
  const body = JSON.stringify(data)
  fs.writeFileSync('./data.json', body)
  res.send(data.test)
})

app.put('/test/', function(req, res){
  const updateBody = req.body;
  data.test = data.test.map(obj=>{
    if(obj.id == updateBody.id){
      obj = updateBody;    
    }
    return obj;
  })
  const body = JSON.stringify(data)
  fs.writeFileSync('./data.json', body)
  res.send(data.test)
})

app.put('/test/isdone',function(req,res){
  const {id} = req.body;
  data.test = data.test.map(obj=>{
    if(obj.id == id){
      obj.sta = !obj.sta;    
    }
    return obj;
  })
  const body = JSON.stringify(data)
  fs.writeFileSync('./data.json', body)
  res.send(data.test)
  
})


app.listen(3001, function () {
  console.log('listening on 3001')
}); 