class Database {

//=======================================Select all employees or select by manager or department=========================================
    getAllEmployees () {
        connection.query("SELECT * FROM employeesdb.employee LEFT JOIN employee_role AS role ON employee.id = role.id LEFT JOIN department AS department ON  manager_id = department.id;", function (err, res) {
            if (err) throw err;
        });
    }

    getByDepartments (department) {
        connection.query("SELECT id, first_name, last_name FROM employee Where department_id = ? ", department, function (err, res) {
            if (err) throw err;
        })
    }

    getByManagers(managerChoice) {
        connection.query("SELECT id, first_name, last_name FROM employee WHERE manager_id = ?", managerChoice, function (err, res) {
            if (err) throw err;
        });
    }

//==========================================add a new employee, department, or roll=============================================================

    createNewDepartment (department_name) {
        connection.query("INSERT INTO department SET ?", [department_name], function (err, res) {
            if (err) throw err;
        })
    }

    createEmployee(first_name, last_name, role_id, manager_id) {
        
        connection.query("INSERT INTO employee SET ?", [first_name, last_name, role_id, manager_id] ,function (err, res) {
            if (err) throw err;
        })
    }

    createNewRole (role_name) {
        connection.query("INSERT INTO role SET ?", [role_name], function (err, res) {
            if(err) throw err;
        })
    }
    
    deleteEmployee(id) {
        connection.query("DELETE * FROM employee WHERE id = ?", id, function (err, res) {
            if (err) throw err;
        });
    }
//========================Select all roles or departments==============================================================================
    getAllRoles(){
        connection.query("SELECT * FROM role", function(err, res) {
            if(err) throw err;
        })
    }

    selectAllDepartments () {
        connection.query("SELECT * FROM departments LEFT JOIN department_name AS departments ON department.id = employee.manager_id;", function (err, res) {
            if (err) throw err;
        })
    }
//=========================Update the roles and managers of the employees=========================================================
    updateRole(updateEmployee, roleUpdate) {
        connection.query("UPDATE employee SET ? WHERE ?;", [updateEmployee, roleUpdate], function(err, res) {
            if (err) throw err;
        })
    }

    updateManager(manager_id, id) {
        connection.query("UPDATE employee SET ? WHERE ?;", [manager_id, id], function (err, res) {
            if (err) throw err;
        });
    }

}

module.exports = new Database;