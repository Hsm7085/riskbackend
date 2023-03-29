const services = require('../services/userservices');

const insertData = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const obj = req.body.obj;
  const regmobile = /^[0-9]+$/;

  if (name.length >= 3 &&
    name.length <= 30 &&
    mobile.length == 10 &&
    regmobile.test(mobile) &&
    (email.charAt(email.length - 4) == "." || email.charAt(email.length - 4) == ".") &&
    obj != null) {
    try {
      const response = await services.insertData(req.body);
      res.send({ status: 0, message: "Request Successful", result: response });
    } catch (error) {
      res.send({ status: -1, message: "Something went wrong", result: error });
    }
  } else {
    res.send({ status: -1, message: "Something is not good" });
  }
};

const getData = async (req, res) => {
  try {
    const response = await services.getData(req.query);
    res.send({ status: 0, message: "get Succesful", result: response });
  } catch (error) {
    res.send({ status: -1, message: "Something went wrong", result: error });
  }
};

const getQues = async (req, res) => {
  try {
    const response = await services.getQues();
    res.send({ status: 0, message: "get Succesful", result: response });
  } catch (error) {
    res.send({ status: -1, message: "Something went wrong", result: error });
  }
};

module.exports = { insertData, getData, getQues };