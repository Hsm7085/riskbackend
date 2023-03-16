const services=require('../services/userservices');
const {connection}=require('../connection/db');
// var cryptojs = require("crypto-js");



 //INSERT
 const insertData=async(req, res)=>{console.log("asc",req.body);
       const res1=await services.insertData(req.body);
       
    //    res.send(res1);
      // return res1;
       res.send(res1); 
};

 module.exports={insertData};