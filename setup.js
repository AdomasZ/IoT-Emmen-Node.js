const mysql = require('mysql');

let con = mysql.createConnection({
	host: "localhost",
	user: "root",
	// password: "!d7NS`",
});

con.connect((err) => {
	if (err) throw err;
	console.log("Connected!");
	let sql = "DROP DATABASE IF EXISTS data";
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("Database dropped.");
	});
	con.query("CREATE DATABASE data", function (err) {
		if (err) throw err;
		console.log("Database created");
	});
	sql = "USE data;";
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("Table created");
	});
	sql = "CREATE TABLE garbageBin (device_id VARCHAR(255) PRIMARY KEY, area VARCHAR(255), type VARCHAR(255), EUI VARCHAR(255), longitude Decimal(9,6), latitude Decimal(9,6), street_address VARCHAR(255), max_height DOUBLE, date_added DATETIME, software_version DOUBLE)";
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("Table created");
	});
	sql = "CREATE TABLE record (id int PRIMARY KEY AUTO_INCREMENT, device_id VARCHAR(255), height double, date_received datetime, FOREIGN KEY(device_id) REFERENCES garbageBin(device_id))";
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("Table created");
	});
	sql = "INSERT INTO garbageBin (device_id, area, type, EUI, longitude, latitude, street_address, max_height, date_added, software_version) " +
		"VALUES ('test', 'Emmen Center', 'Plastic', 'A8610A3037307807', 52.784525, 6.892475, 'Raadhuisplein 1, 7811 AP Emmen', 62, '2019-05-16T12:38:49.38', 1)";
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("1 garbage bin inserted");
	});
	sql = "INSERT INTO garbageBin (device_id, area, type, EUI, longitude, latitude, street_address, max_height, date_added, software_version) " +
		"VALUES ('af01', 'Emmen Stenden', 'Plastic', 'A8610A3037307807', 52.778579, 6.912400, 'Van Schaikweg 94, 7811 KL Emmen', 400, '2018-06-14T08:50:53.38', 1.0)";
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("1 garbage bin inserted");
	});

	sql = "INSERT INTO garbageBin (device_id, area, type, EUI, longitude, latitude, street_address, max_height, date_added, software_version) " +
		"VALUES ('af02', 'Emmen Center', 'Plastic', 'A8610A3037307807', 52.782779, 6.891770, 'Wildlands Radhuisplein', 400, '2019-04-28T09:09:09.38', 1.1)";
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("1 garbage bin inserted");
	});

	sql = "INSERT INTO garbageBin (device_id, area, type, EUI, longitude, latitude, street_address, max_height, date_added, software_version) " +
		"VALUES ('af03', 'Emmen Center', 'Paper', 'A8610A3037307807', 52.786103, 6.894323, 'Hoofdstraat 51-53, 7811ED Emmen', 400, '2018-06-14T08:50:53.38', 1.0)";
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("1 garbage bin inserted");
	});

	//device records
	//af01
	sql = `INSERT INTO record (device_id, height, date_received) VALUES ('af01', 0, '2018-06-14T08:50:53.38')`;
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("1 record inserted");
	});

	sql = `INSERT INTO record (device_id, height, date_received) VALUES ('af01', 100, '2018-06-17T08:50:53.38')`;
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("1 record inserted");
	});

	sql = `INSERT INTO record (device_id, height, date_received) VALUES ('af01', 50, '2018-07-01T08:50:53.38')`;
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("1 record inserted");
	});

	sql = `INSERT INTO record (device_id, height, date_received) VALUES ('af01', 0, '2018-09-09T08:50:53.38')`;
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("1 record inserted");
	});

	sql = `INSERT INTO record (device_id, height, date_received) VALUES ('af01', 100, '2019-04-27T08:50:53.38')`;
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("1 record inserted");
	});

	sql = `INSERT INTO record (device_id, height, date_received) VALUES ('af01', 150, '2019-04-28T08:50:53.38')`;
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("1 record inserted");
	});

	sql = `INSERT INTO record (device_id, height, date_received) VALUES ('af01', 200, '2019-04-30T08:50:53.38')`;
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("1 record inserted");
	});

	sql = `INSERT INTO record (device_id, height, date_received) VALUES ('af01', 0, '2019-05-05T10:10:10.00')`;
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("1 record inserted");
	});

	// af02
	sql = `INSERT INTO record (device_id, height, date_received) VALUES ('af02', 0, '2019-04-28T08:50:53.38')`;
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("1 record inserted");
	});

	sql = `INSERT INTO record (device_id, height, date_received) VALUES ('af02', 100, '2019-04-29T08:50:53.38')`;
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("1 record inserted");
	});

	sql = `INSERT INTO record (device_id, height, date_received) VALUES ('af02', 0, '2019-04-30T08:50:53.38')`;
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("1 record inserted");
	});

	sql = `INSERT INTO record (device_id, height, date_received) VALUES ('af02', 100, '2019-05-02T08:50:53.38')`;
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("1 record inserted");
	});

	sql = `INSERT INTO record (device_id, height, date_received) VALUES ('af02', 0, '2019-05-03T10:10:10.00')`;
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("1 record inserted");
	});

	//af03
	sql = `INSERT INTO record (device_id, height, date_received) VALUES ('af03', 400, '2018-06-14T08:50:53.38')`;
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("1 record inserted");
	});

	sql = `INSERT INTO record (device_id, height, date_received) VALUES ('af03', 300, '2018-06-17T08:50:53.38')`;
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("1 record inserted");
	});

	sql = `INSERT INTO record (device_id, height, date_received) VALUES ('af03', 350, '2018-07-01T08:50:53.38')`;
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("1 record inserted");
	});

	sql = `INSERT INTO record (device_id, height, date_received) VALUES ('af03', 400, '2018-09-09T08:50:53.38')`;
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("1 record inserted");
	});

	sql = `INSERT INTO record (device_id, height, date_received) VALUES ('af03', 300, '2019-04-27T08:50:53.38')`;
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("1 record inserted");
	});

	sql = `INSERT INTO record (device_id, height, date_received) VALUES ('af03', 300, '2019-04-27T08:50:53.38')`;
	con.query(sql, function (err) {
		if (err) throw err;
		console.log("1 record inserted");
	});

});
