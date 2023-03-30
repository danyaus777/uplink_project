const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'uplink_db',
    password: ''
})
connection.connect()

module.exports = connection