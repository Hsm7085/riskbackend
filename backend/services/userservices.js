const userdb=require('../Repositories/userdb');
const {connection}=require('../connection/db');



//INSERT
async function insertData(user){
    console.log("hii",user.obj);
   
    let data = JSON.stringify(user.obj);
    // let data=user.obj;
    let name=user.name;
    let email=user.email;
    let mobile=user.mobile;
    const abc=`insert into details(NAME,EMAIL,MOBILE,USERDATA) values('${name}','${email}','${mobile}','${data}') ON DUPLICATE KEY UPDATE    
    USERDATA='${data}'`;
   console.log(data);
    console.log(abc);
  let result;
  try{
    result=await userdb.insertData(abc);
  }  
  catch(err){
    result=err;
    console.log(err);
  }
  
    return result;
}





module.exports={insertData};