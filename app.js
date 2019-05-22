const http = require('http');
const mysql = require('mysql');
let sql;

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",//!d7NS`
    database: "data"
});
var minutes = 60 * 3, the_interval = minutes * 60 * 1000;
setInterval(() => { fetch(); }, the_interval);
http.createServer(function (req, res) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    switch (req.url) {
        case '/getDevices':
            getDevices(res);
            break;
        case '/getRecords':
            getRecords(res);
            break;
    }
    // setTimout(3 * 60 * 60 * 60 * 1000, fetch());
}).listen(8080);


const getDevices = (res) => {
    sql = `SELECT * FROM garbageBin`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        let myObj = JSON.parse(JSON.stringify(result));
        let deviceArray = [];
        for(let i = 0; i < myObj.length; i++){
            deviceArray.push(myObj[i]);
        }
        res.write(JSON.stringify(deviceArray));
        res.end();
    });
};
const getRecords = (res) => {
    sql = `SELECT * FROM record`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        let myObj = JSON.parse(JSON.stringify(result));
        let deviceArray = [];
        for(let i = 0; i < myObj.length; i++){
            deviceArray.push(myObj[i]);
        }
        res.write(JSON.stringify(deviceArray));
        res.end();
    });
};

const fetch = () => {
    const options = {
        url: 'https://gem.data.thethingsnetwork.org/api/v2/query?last=3h',
        headers: {
            'Authorization': 'key ttn-account-v2.VUaxxx7tf9lvtUph0nUcemiekjG2QouvhN9_HGKacKc'
        }
    };

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        request.get(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let myObj = JSON.parse(response.toJSON().body);
                let height;
                let deviceId;
                let time;
                for (let i = 0; i < myObj.length; i++) {
                    height = myObj[i].receivedString;
                    deviceId = myObj[i].device_id;
                    time = myObj[i].time;
                    let sql = `INSERT INTO record (device_id, height, date_received) VALUES ('${deviceId}', ${height}, '${time.slice(0, -8)}')`;
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log("1 record inserted");
                    });
                }
            }
        });
    });
};