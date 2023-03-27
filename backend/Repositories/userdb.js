const { connection } = require('../connection/db');

async function insertData(user) {

  let data = JSON.stringify(user.obj);
  let name = user.name;
  let email = user.email;
  let mobile = user.mobile;
  const abc = `insert into details(NAME,EMAIL,MOBILE,USERDATA) values('${name}','${email}','${mobile}','${data}') ON DUPLICATE KEY UPDATE    
    USERDATA='${data}'`;

    return new Promise(function (resolve, reject) {
        connection.query(abc, function (err, results) {
            if (err) {
                reject(err.message);
            }
            else {
                resolve(results);
            }
        }
        );
    })

}


module.exports = { insertData };