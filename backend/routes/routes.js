const usercontroller=require('../controller/userController');
const {registervalidate} = require('../validation/validation');
const express=require('express');
const router=express.Router();
var bodyParser=require("body-parser");



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

//Insert
router.post('/api',registervalidate,usercontroller.insertData);



module.exports=router;