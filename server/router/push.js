const pushRouter = require('express').Router();

pushRouter.get('/', async function(req,res){
    res.send('푸쉬 준비중..')
})




module.exports = pushRouter
