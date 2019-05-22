var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",//!d7NS`
    database: "data"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var sql = "CREATE TABLE garbageBin (device_id VARCHAR(255) PRIMARY KEY, EUI VARCHAR(255), longitude Decimal(9,6), latitude Decimal(9,6), street_address VARCHAR(255), max_height DOUBLE, last_seen DATETIME, date_added DATETIME, software_version DOUBLE)";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });

    var sql = "CREATE TABLE record (id int PRIMARY KEY AUTO_INCREMENT, device_id VARCHAR(255), height double, date_received datetime, FOREIGN KEY(device_id) REFERENCES garbageBin(device_id))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });

});

