const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'empresa',
    multipleStatements: true

})

mysqlConnection.connect(function(err) {
    if (err) {
        return err
    } else {
        return "DB conectada ok";
    }
});

module.exports = mysqlConnection;