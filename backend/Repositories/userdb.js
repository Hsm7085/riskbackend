const { connection } = require('../connection/db')
//Sql query for getting data
async function insertData(user) {
    const data = JSON.stringify(user.obj)
    const name = user.name
    const email = user.email
    const mobile = user.mobile
    const query = `insert into details(NAME,EMAIL,MOBILE,USERDATA) values('${name}','${email}','${mobile}','${data}') ON DUPLICATE KEY UPDATE    
    USERDATA='${data}'`
    return new Promise(function (resolve, reject) {
        connection.query(query, function (err, results) {
            if (err) {
                reject(err.message)
            }
            resolve(results)
        })
    })
}
// Sql query for getting user data 
async function getData(user) {
    const name = user.name
    const email = user.email
    const mobile = user.mobile
    const query = `select USERDATA from details where NAME='${name}'and EMAIL='${email}'and MOBILE=${mobile}`
    return new Promise(function (resolve, reject) {
        connection.query(query, function (err, res) {
            if (err) {
                reject(err.message)
            }
            resolve(res)
        })
    })
}
// Sql query for getting question
async function getQues() {
    const query = `select questions from riskprofiledata where ID='${1}'`
    return new Promise(function (resolve, reject) {
        connection.query(query, function (err, res) {
            if (err) {
                reject(err.message)
            }
            resolve(res)
        })
    })
}

module.exports = { insertData, getData, getQues }