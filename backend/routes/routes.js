const usercontroller = require('../controller/userController');
const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/insertProfileData', usercontroller.insertData);
router.get('/getGraphData', usercontroller.getData);
router.get('/riskProfileQuestions', usercontroller.getQues);

module.exports = router;