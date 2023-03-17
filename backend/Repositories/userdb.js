const { connection } = require('../connection/db');

async function insertData(abc) {
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