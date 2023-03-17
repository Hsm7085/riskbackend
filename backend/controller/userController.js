const services = require('../services/userservices');

const insertData = async (req, res) => {
  const res1 = await services.insertData(req.body);
  res.send(res1);
};

module.exports = { insertData };