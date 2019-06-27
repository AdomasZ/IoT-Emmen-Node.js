var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "!d7NS`",
    database: "data"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO garbageBin (device_id, area, type, EUI, longitude, latitude, street_address, max_height, date_added, software_version) " +
        "VALUES ('test', 'Emmen Center', 'Plastic', 'A8610A3037307807', 52.784525, 6.892475, 'Raadhuisplein 1, 7811 AP Emmen', 62, '2019-05-16T12:38:49.38', 1)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});