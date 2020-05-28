var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 5000

var Users = require('./routes/users')
var AssetType = require('./routes/assettype')
var Purpose = require('./routes/purposes')
var EmployeeRole = require('./routes/employeeroles')
var Department = require('./routes/departments')
var Employee = require('./routes/employees')
var Asset = require('./routes/assets')

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
app.use('/employee-roles', EmployeeRole)
app.use('/departments', Department)
app.use('/employees', Employee)
app.use('/assets', Asset)

app.listen(port, () => {
  console.log('Server is running on port: ' + port)
})