const Router = require('express')
const router = new Router()
const controll = require('./authControll')
//const authmiddle = require('./middleware/middleware')
const rolemiddle = require('../node-api-postgres/middleware/rolemiddle')

router.post('/registration', controll.registration)
router.post('/login', controll.login)
router.get('/users', rolemiddle(['manager', 'admin']) ,controll.getUsers)

module.exports = router