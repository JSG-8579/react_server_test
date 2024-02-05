const pushRouter = require('express').Router();
const webpush = require('web-push');

const vapidKeys = webpush.generateVAPIDKeys();

webpush.setVapidDetails(
    'mailto:jsg8733@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

pushRouter.get('/', async function (req, res) {
    res.send('푸쉬 준비중..')
})

pushRouter.get('/publicKey', function (req, res) {
    res.send(vapidKeys.publicKey)
})

pushRouter.post('/sendNoti', function (req, res) {

    let data = JSON.stringify({ msg: 'hello pwa' })

    setTimeout(function () {
        webpush.sendNotification(req.body.subscribe, data)
            .then(function () {
                res.sendStatus(202);
            })
            .catch(function (error) {
                res.sendStatus(500);
                console.log(error);
            });
    }, 3000);

})




module.exports = pushRouter
