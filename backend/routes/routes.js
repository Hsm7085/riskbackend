const { validateInsertData, getDataFromServices, getQuesFromServices }= require('../controller/userController')
const express = require('express')
const router = express.Router()
var bodyParser = require("body-parser")

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.post('/insertProfileData',validateInsertData)
router.get('/getGraphData',getDataFromServices)
router.get('/getRiskProfileQuestions',getQuesFromServices)

module.exports = router