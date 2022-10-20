const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const authRouter = require('./routerAuthorization')
const productRouter = require('./products/routerProducts')
const port = 3000

app.use(bodyParser.json())

app.use("/auth", authRouter)
app.use("/products", productRouter)

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.listen(port, () => {
  try {
    console.log(`App running on port ${port}.`)
  } catch (error) {
    console.log(error)
  }
  
})