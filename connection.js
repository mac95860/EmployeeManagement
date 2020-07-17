const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "this.password",
    database: "employeesDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected to db");
});

connection.query = util.promisify(connection.query);