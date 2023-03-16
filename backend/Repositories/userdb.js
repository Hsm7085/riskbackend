const {connection}=require('../connection/db');

// INSERT
async function insertData(abc){
    return new Promise(function(resolve,reject){
        connection.query(abc,function(err ,results){
        
            if(err){
                reject(err.message);
            }
            else{
                resolve(results);
            }
            // console.log(results);            
        }
     );
    })

}


module.exports={insertData};