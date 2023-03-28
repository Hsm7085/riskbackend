const services = require('../services/userservices');

const insertData = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const obj = req.body.obj;
  const regmobile = /^[0-9]+$/;
  if (name.length < 3 ||
    name.length > 30 ||
    mobile.length !== 10 ||
    !regmobile.test(mobile) ||
    email.charAt(email.length - 4) !== "." && email.charAt(email.length - 4) !== "." ||
    obj == null) {
    res.send({ status: -1, message: "Something is not good" });
  } else {
    const res1 = await services.insertData(req.body);
    res.send({ status: 0, message: "Request Succesful", result: res1 });
  }
};

const getData = async (req, res) => {
  const res1 = await services.getData(req.query);
  res.send({ status: 0, message: "get Succesful", result: res1 });
};

const getQues = async (req, res) => {
  const res1 = await services.getQues();
  res.send({ status: 0, message: "get Succesful", result: res1 });
};

module.exports = { insertData, getData, getQues };