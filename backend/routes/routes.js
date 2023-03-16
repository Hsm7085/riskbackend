const usercontroller=require('../controller/userController');
const express=require('express');
const router=express.Router();
const {connection}=require("../connection/db");
var bodyParser=require("body-parser");


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

//Insert
router.post('/api',usercontroller.insertData);



module.exports=router;