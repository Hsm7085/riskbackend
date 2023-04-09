const { validateInsertData, getDataFromServices, getQuesFromServices }= require('../controller/userController')
var express = require('express')
const router = express.Router()

router.post('/insertProfileData',validateInsertData)
router.get('/getGraphData',getDataFromServices)
router.get('/getRiskProfileQuestions',getQuesFromServices)

module.exports = router