const { insertDataController, getDataController, getQuesController }= require('../controller/userController')
const express = require('express')
const router = express.Router()
var bodyParser = require("body-parser")

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.post('/insertProfileData',insertDataController)
router.get('/getGraphData',getDataController)
router.get('/getRiskProfileQuestions',getQuesController)

module.exports = router