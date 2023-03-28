const userdb = require('../Repositories/userdb');

async function insertData(user) {
  var result;
  try {
    result = await userdb.insertData(user);
  }
  catch (err) {
    result = err;
  }
  return result;
};

async function getData(user) {
  var result;
  try {
    result = await userdb.getData(user);
  }
  catch (err) {
    result = err;
  }
  if (typeof (result) != 'object') {
    return "Something went wrong";
  }
  var sum = 0;
  var riskLabel;
  for (var i = 1; i <= Object.keys(result[0].USERDATA).length; i++) {
    sum = sum + result[0].USERDATA[i].score;
  }
  switch (true) {
    case sum == 0 && sum <= 10:
      riskLabel = "Conservative";
      break;
    case sum >= 11 && sum <= 20:
      riskLabel = "Moderate Conservative";
      break;
    case sum >= 21 && sum <= 30:
      riskLabel = "Moderate";
      break;
    case sum >= 31 && sum <= 40:
      riskLabel = "Moderate Aggressive";
      break;
    default:
      riskLabel = "Aggressive";
      break;
  }
  return { sum, riskLabel };
};

async function getQues() {
  var result;
  try {
    result = await userdb.getQues();
  }
  catch (err) {
    result = err;
  }
  return result;
};

module.exports = { insertData, getData, getQues };