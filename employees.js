const mysql = require("mysql");
const inquirer = require('inquirer');
const db = require('./dbUpdate');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "this.password",
    database: "employees"
});

connection.connect(function (err) {
    if (err) throw err;
    prompts();
});

function prompts() {
    inquirer
        .prompt(
            {
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "Display all employees",
                    "Display all employees by department",
                    "Display all employees by Manager",
                    "Add a new employee",
                    "Remove employee",
                    "Update employee",
                    "Update employee role",
                    "Update employee Manager"
                ],
                name: "choice"
            }
        ).then((res) => {
            switch (res.choice) {
                case "Display all employees":
                    displayAllEmployees();
                    break;
                case "Display all employees by department":
                    displayByDepartment();
                    break;
                case "Display all employees by Manager":
                    displayByManager();
                    break;
                case "Add a new employee":
                    addNewEmployee();
                    break;
                case "Add a new department":
                    addNewDepartment();
                    break;
                case "Add a new role":
                    addNewRole();
                    break;
                case "Remove employee":
                    removeEmployee();
                    break;
                case "Update employee":
                    updateEmployee();
                case "Update employee role":
                    updateRole();
                    break;
                case "Update employee Manager":
                    updateManager();
                    break;

            }
        });
}

async function displayAllEmployees() {
    const allEmployees = db.getAllEmployees();
    console.table(allEmployees);
}

async function displayByDepartment() {
    const department = await database.selectAllDepartments();
    const choices = department.map(({ id, department_name }) => ({
        id: id,
        department_name: department_name
    }));

    const { chosenDepartment } = await inquirer
        .prompt({
            type: "list",
            message: "Which department would you like to view?",
            choice: choices,
            name: "chosenDepartment"
        });

    console.table(chosenDepartment);
}

async function displayByManager() {
    const employees = await db.getAllEmployees();
    const manager = employees.map(({ id, first_name, last_name }) => ({
        id: id,
        first_name: first_name,
        last_name: last_name,
    }));

    const { managerChoice } = await inquirer
        .prompt(
            {
                type: 'list',
                message: "Which employee would like to review?",
                choices: manager,
                name: "managerChoice"
            }
        )

    const managerChosen = await database.getByManagers(managerChoice);
    console.table(managerChosen);
}

async function addNewEmployee() {
    const { first_name, last_name, role_id, manager_id} = await inquirer.prompt([
        {
            type: "input",
            message: "Enter first name",
            name: "first_name"
        },
        {
            type: "input",
            message: "Enter last name",
            name: "last_name"
        },
        {
            type: "input",
            message: "Give the employee's role_id",
            name: "role_id"
        },
        {
            type: "input",
            message: "assign the employee a manager with the manager's id",
            name: "manager_id"
        }]);

        await addNewEmployee(first_name, last_name, role_id, manager_id)
        console.log(`${first_name} ${last_name}'s information has been added to the system.`)
}

async function addNewDepartment() {
    const { department_name } = await inquirer.prompt([
        {
            type: "input",
            message: "What department are you wanting to create?",
            name: department_name 
        }
    ]);

    await createNewDepartment(department_name);
    console.log(`The ${department_name} has been created`);
}

async function addNewRole() {
    const { role_name } = await inquirer.prompt([
        {
            type: "input",
            message: "What role would you like to create?",
            name: role_name
        }
    ]);

    await createNewRole(role_name);
    console.log(`The role of ${role_name} has been created`); 
}

async function removeEmployee() {
    
    const employeeChoices = db.getEmployees()
    const employee = employeeChoices.map(({ id, first_name, last_name }) =>
        ({
            first_name: first_name,
            last_name: last_name,
            id: id
        }));

    const { removed } = await inquirer({
        type: "list",
        message: "Which employee is being removed?",
        choices: employee,
        name: "removed"
    });

    await database.deleteEmployee(removed);
    console.log(`${removed} has been removed`);
    console.table(employeeChoices);
}

async function updateRole() {

    const employeeChoices = await db.getEmployees();
    const employee = employeeChoices.map(({ id, first_name, last_name }) => ({
        first_name: first_name,
        last_name: last_name,
        id: id
    }));
   
    const { updateEmployee } = await inquirer.prompt({
        type: "list",
        message: "Which employee do you want to update?",
        choices: employee,
        name: "updateEmployees"
    });


    const { roles } = database.getAllRoles().map(({id, role_name}) => ({
        role_name: role_name,
        id: id
    }));

    const { roleUpdate } = await inquirer.prompt({
        type: "list",
        message: "What role would you like to give the employee?",
        choices: roles,
        name: "roleUpdate"
    });

    console.log(`${updateEmployee}'s role has been updated`);

    database.updateRole(updateEmployee, roleUpdate);

}

