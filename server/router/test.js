const testRouter = require('express').Router();
const { MongoClient } = require('mongodb');


//mongodb 사용법
const connetUrl = process.env.MONGO_DB
const client = new MongoClient(connetUrl);

let collection;

const dbConnect = async () => {
    await client.connect();
}

const crud = async (type, info) => {
    const db = client.db('bucket');
    collection = db.collection('bucket-list');

    switch (type) {
        case 'post': await collection.insertOne(info); break;
        case 'delete': await collection.deleteOne({ id: info }); break;
        case 'put': await collection.updateOne({ id: info.id }, { $set: { name: info.name } }); break;
        case 'isdone': await collection.updateOne({ id: info[0].id }, { $set: { sta: !info[0].sta } }); break;
    }
    const data = await collection.find().toArray();
    // console.log(data)
    return data;
}



testRouter.get('/mongo', async function (req, res) {
    // console.log(req.body)
    res.send(await crud())
})

testRouter.get('/mongo/:id', async function (req, res) {
    const { id } = req.params;
    const finddata = await crud()
    // console.log(finddata)
    // const a = finddata.find(obj=>obj.id==id)
    // console.log(a)

    res.send(finddata.find(obj => obj.id == id))
})

testRouter.post('/mongo', async function (req, res) {
    // console.log(req.body)
    res.send(await crud('post', req.body))
})

testRouter.delete('/mongo/:id', async function (req, res) {
    const { id } = req.params;
    const deletedata = await crud()
    const a = deletedata.find(obj => obj.id == id)
    console.log()
    res.send(await crud('delete', a.id))
})

testRouter.put('/mongo/', async function (req, res) {

    res.send(await crud('put', req.body))
})

testRouter.put('/mongo/isdone', async function (req, res) {
    const { id } = req.body;
    const data1 = await collection.find({ id: id }).toArray();
    // console.log(data1)
    res.send(await crud('isdone', data1))
})





testRouter.get('/test', function (req, res) {
    res.send(data.test)
})
//json의 test 부분 들고오기

testRouter.get('/test/:id', function (req, res) {
    const {id} = req.params;
    const findData = data.test.find(obj=>obj.id==id)
    res.send(findData)
})

testRouter.post('/test', function (req,res){
  const body = JSON.stringify({...data,test:[...data.test, req.body]})
  data.test.push(req.body)
  const dataInsert = fs.writeFileSync('./data.json', body)
  res.send(data.test)
})

testRouter.delete('/test/:id', function(req, res){
  const {id} = req.params;
  data.test = data.test.filter(obj=>obj.id != id)
  const body = JSON.stringify(data)
  fs.writeFileSync('./data.json', body)
  res.send(data.test)
})

testRouter.put('/test/', function(req, res){
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

testRouter.put('/test/isdone',function(req,res){
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



module.exports = {testRouter};

// exports.testRouter = testRouter;
// exports.dbConnect = dbConnect;