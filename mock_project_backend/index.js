var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 5000

var Users = require('./routes/users')
var AssetType = require('./routes/assettype')
var Purpose = require('./routes/purposes')

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

app.use('/users', Users)
app.use('/asset-type', AssetType)
app.use('/purposes', Purpose)

app.listen(port, () => {
  console.log('Server is running on port: ' + port)
})