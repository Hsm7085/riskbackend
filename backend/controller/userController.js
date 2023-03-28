const services = require('../services/userservices');

const insertData = async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let mobile = req.body.mobile;
  let obj = req.body.obj;



  let regmobile = /^[0-9]+$/;
  if (name.length < 3 || name.length > 30) {
    res.send({ status: -1, message: "Something is not good" });
  } else if (mobile.length !== 10 || !regmobile.test(mobile)) {
    res.send({ status: -1, message: "Something is not good" });
  } else if (email.charAt(email.length - 4) !== "." && email.charAt(email.length - 4) !== ".") {
    res.send({ status: -1, message: "Something is not good" });
  } else if (obj === null) {
    res.send({ status: -1, message: "Something is not good" });
  } else {
    const res1 = await services.insertData(req.body);
    res.send({ status: 0, message: "Request Succesful", result: res1 });
  }



};

const getData=async (req,res)=>{
  const res1=await services.getData(req.query);
 
  res.send({ status: 0, message: "get Succesful", result: res1 });
};

const getQues=async (req,res)=>{
  const res1=await services.getQues();
  
  res.send({ status: 0, message: "get Succesful", result: res1 });
};

module.exports = { insertData,getData,getQues };