const routes = require('./routes/routes')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use("/", routes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})