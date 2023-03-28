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

};


async function getData(user){
  let name = user.name;
  let email = user.email;
  let mobile = user.mobile;
    const abc=`select USERDATA from details where NAME='${name}'and EMAIL='${email}'and MOBILE=${mobile}`;
    return new Promise(function(resolve,reject){
        connection.query(abc,function(err ,res){
            if(err){
                // return console.log(err);
                reject(err.message);
            }
            resolve(res);
          })
          
        }
    )
}



module.exports = { insertData,getData };