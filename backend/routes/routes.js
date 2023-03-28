const usercontroller = require('../controller/userController');
const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/api', usercontroller.insertData);
router.get('/get', usercontroller.getData);

module.exports = router;