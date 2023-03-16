const userdb=require('../Repositories/userdb');
const {connection}=require('../connection/db');



//INSERT
async function insertData(user){
    console.log("hii",user.obj);
    let data=user.obj;
    const abc='insert into details(USERDATA) values("'+data+'")';
  
  let result;
  try{
    result=await userdb.insertData(abc);
  }  
  catch(err){
    result=err;
  }
  
    return result;
}





module.exports={insertData};