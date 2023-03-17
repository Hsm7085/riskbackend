const userdb = require('../Repositories/userdb');

async function insertData(user) {

  let data = JSON.stringify(user.obj);
  let name = user.name;
  let email = user.email;
  let mobile = user.mobile;
  const abc = `insert into details(NAME,EMAIL,MOBILE,USERDATA) values('${name}','${email}','${mobile}','${data}') ON DUPLICATE KEY UPDATE    
    USERDATA='${data}'`;
  let result;
  try {
    result = await userdb.insertData(abc);
  }
  catch (err) {
    result = err;
  }

  return result;
}

module.exports = { insertData };