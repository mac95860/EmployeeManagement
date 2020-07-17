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

class Database {
    constructor(connection) {
        this.connection = connection
    }
//=======================================Select all employees or select by manager or department=======r==================================
    getAllEmployees () { //works
       return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, title AS role FROM employee LEFT JOIN employee_role ON employee.role_id WHERE employee.role_id = employee_role.id;");
    }

    getByDepartments (departmentChoice) { //works

      return this.connection.query(
          "SELECT * FROM employee LEFT JOIN employee_role on employee.role_id = employee_role.id LEFT JOIN department department on employee_role.department_id = department.id WHERE department.id = ?; ", 
        [departmentChoice]
        );
    }

    getAllManagers() { //works
        return this.connection.query("SELECT employee.first_name, employee.last_name, department.id, employee_role.title AS role FROM employee LEFT JOIN employee_role on employee.role_id = employee_role.id LEFT JOIN department on employee_role.department_id = department.id WHERE manager_id IS null;")
    }

    getByManagers(managerChoice) {//works
      return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, department_id, title, department_name AS department FROM employee LEFT JOIN employee_role on employee_role.id = employee.role_id LEFT JOIN department ON department.id = employee_role.department_id WHERE manager_id = ? ;", [managerChoice]);
    }

//==========================================add a new employee=============================================================

    createEmployee(first_name, last_name, role_id, manager_id) {
        
        connection.query("INSERT INTO employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? ;", [first_name, last_name, role_id, manager_id] ,function (err, res) {
            if (err) throw err;
        })
    }

    deleteEmployee(id) {
       return this.connection.query("DELETE FROM employee WHERE id = ?", [id]);
    }
//========================Select all roles or departments==============================================================================
    getAllRoles(){
        return this.connection.query("SELECT * FROM employee_role", function(err, res) {
            if(err) throw err;
        })
    }

    selectAllDepartments () {
       return this.connection.query("SELECT * FROM department");
    }
//=========================Update the roles of the employees=========================================================
    updateRole(updateEmployee, roleUpdate) {
       return this.connection.query("UPDATE employee SET role_id = ? WHERE id = ?;", [roleUpdate, updateEmployee], function(err, res) {
            if (err) {
                console.log(err);
            };  
        })
    }

}

module.exports = new Database(connection);