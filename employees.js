const inquirer = require('inquirer');
const db = require('./dbUpdate');

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
                    "Update employee role",
                    "remove an employee"
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
                case "remove an employee":
                    removeEmployee();
                    break;
                case "Update employee role":
                    updateRole();
            }
        });
}

async function displayAllEmployees() {//works
    const allEmployees = await db.getAllEmployees();
    
    console.table(allEmployees);
    prompts();
}

async function displayByDepartment() { //works
    const department =  await db.selectAllDepartments();
   
    const choices = department.map(({ id, department_name }) => ({
        department_name: department_name,
        value: id,
    }));

    console.table(choices);
    
    const { chosenDepartment } = await inquirer
        .prompt({
            type: "list",
            name: "chosenDepartment",
            message: "Which department would you like to view?",
            choices: choices,
            
        });

    const listByDepartment = await db.getByDepartments(chosenDepartment);
    
     console.table(listByDepartment);
     prompts();
}

async function displayByManager() { //works
    const employees = await db.getAllManagers();
    const manager = employees.map(({ id, first_name, last_name, role }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
        role: role
    }));
    
    console.table(manager);

    const { managerChoice } = await inquirer
        .prompt(
            {
                type: 'list',
                message: "Which employee would like to review?",
                choices: manager,
                name: "managerChoice"
            }
        )
    console.log(managerChoice);

    const managerChosen = await db.getByManagers(managerChoice);
    console.table(managerChosen);
    prompts();
}

async function addNewEmployee() { //works
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

        await db.createEmployee(first_name, last_name, role_id, manager_id)
        console.log(`${first_name} ${last_name}'s information has been added to the system.`)
        prompts();
}

async function removeEmployee() {//works
    
    const allEmployees = await db.getAllEmployees();
    const employee = allEmployees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));

    console.table(employee);

    const { removed } = await inquirer
        .prompt({
        type: "list",
        message: "Which employee is being removed?",
        choices: employee,
        name: "removed"
    });

    await db.deleteEmployee(removed);
    console.log(`Employee has been removed from the system`);
    const newEmployeeList = await db.getAllEmployees();
    const newEmployeeTable = newEmployeeList.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));
    
    console.table(newEmployeeTable);

    prompts()
}

async function updateRole() {

    const employeeChoices = await db.getAllEmployees();
    const employee = employeeChoices.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));
   
    const { updateEmployees } = await inquirer.prompt([{
        type: "list",
        message: "Which employee do you want to update?",
        choices: employee,
        name: "updateEmployees"
    }])

    const getRoles = await db.getAllRoles();
    
    const roles = getRoles.map(({ id, title }) => ({
        role: title,
        value: id
    }));

    const { roleUpdate } = await inquirer
    .prompt([{
        type: "list",
        message: "What role would you like to give the employee?",
        choices: roles,
        name: "roleUpdate"
    }]);

    console.log(`${updateEmployees}'s role has been updated`);

    db.updateRole(updateEmployees, roleUpdate);

    prompts()

}

prompts();

