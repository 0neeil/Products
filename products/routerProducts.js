const Router = require('express')
const router = new Router()
const products = require ('./products')
//const authmiddle = require('./middleware/middleware')
const rolemiddle = require('../middleware/rolemiddle')

router.post('/product', rolemiddle(['manager', 'admin']), products.addProducts)
router.post('/product/updateProduct', rolemiddle(['manager', 'admin']), products.updateProducts)
router.post('/product/buy/:id/:username', rolemiddle(['user', 'manager', 'admin']), products.buyProducts)
router.get('/product', products.getProducts)


module.exports = router