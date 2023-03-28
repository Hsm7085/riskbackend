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
};

async function getData(user){
  
  let result;
  try {
    result = await userdb.getData(user);
  }
  catch (err) {
    result = err;
  }

if(typeof(result)==='object'){
var score=0;
for(var i=1;i<=Object.keys(result[0].USERDATA).length;i++){
score=score+result[0].USERDATA[i].score;
}

  return score;
}
else{
  return "Something went wrong";
}
};

  



module.exports = { insertData,getData };