const userdb = require('../Repositories/userdb');

async function insertData(user) {

  let result;
  try {
    result = await userdb.insertData(user);
  }
  catch (err) {
    result = err;
  }

  return result;
}

module.exports = { insertData };