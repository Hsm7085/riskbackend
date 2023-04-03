const { connection } = require('../connection/db')
//Sql query for getting data
const insertData = async (user) => {
    const { userSelectedData, name, email, mobile } = user
    const data = JSON.stringify(userSelectedData)
    const query = `insert into details(NAME,EMAIL,MOBILE,USERDATA) values('${name}','${email}','${mobile}','${data}') ON DUPLICATE KEY UPDATE    
    USERDATA='${data}'`
    return new Promise(function (resolve, reject) {
        connection.query(query, function (error, results) {
            if (error) {
                reject(error.message)
            }
            resolve(results)
        })
    })
}
// Sql query for getting user data 
const getData = async (user) => {
    const { name, email, mobile } = user
    const query = `select * from details where NAME='${name}'and EMAIL='${email}'and MOBILE=${mobile}`
    return new Promise(function (resolve, reject) {
        connection.query(query, function (error, results) {
            if (error) {
                reject(error.message)
            }
            resolve(results)
        })
    })
}
// Sql query for getting question
const getQues = async () => {
    const query = `select * from riskprofiledata`
    return new Promise(function (resolve, reject) {
        connection.query(query, function (error, results) {
            if (error) {
                reject(error.message)
            }
            resolve(results)
        })
    })
}

module.exports = { insertData, getData, getQues }