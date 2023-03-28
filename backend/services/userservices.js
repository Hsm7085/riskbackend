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

if(typeof(result)=='object'){
var sum=0;
var riskLabel;
for(var i=1;i<=Object.keys(result[0].USERDATA).length;i++){
sum=sum+result[0].USERDATA[i].score;
}


  if (sum == 0 && sum <= 10) {
    riskLabel="Conservative";
  } else if (sum >= 11 && sum <= 20) {
    riskLabel="Moderate Conservative";
  } else if (sum >= 21 && sum <= 30) {
    riskLabel="Moderate";
  } else if (sum >= 31 && sum <= 40) {
    riskLabel="Moderate Aggressive";
  } else {
    riskLabel="Aggressive";
  }


  return {sum,riskLabel};
}
else{
  return "Something went wrong";
}
};

  

async function getQues(){
  
  let result;
  try {
    result = await userdb.getQues();
  }
  catch (err) {
    result = err;
  }


return result;
};

  


module.exports = { insertData,getData,getQues };