const inquirer = require('inquirer');
const consoleTable = require('console.table');
const connection = require('./database/connection.js');


function prompts(){
    inquirer.prompt([{
        type:"list",
        name:"userChoice",
        message:"What would you like to do?",
        choices: ["View departments", "View roles", "View employees", "Add departments", "Add roles", "Add employees", "Update employee roles", "None"]
    }]).then(function(ans){
        switch(ans.userChoice){
            case "View departments":
                viewDepartments();
                break;

            case "View roles":
                viewRoles();
                break;

            case "View employees":
                viewEmployees();
                break;

            case "Add departments":
                addDepartments();
                break;

            case "Add roles":
                addRoles();
                break;

            case "Add employees":
                addEmployees();
                break;

            case "Update employee roles":
                updateRoles();
                break;

            case "None":
                process.exit();
        }
    })
}
async function viewDepartments(){
    let departments = await connection.query("SELECT * FROM department;");
    console.table(departments);
    prompts();
};

async function viewRoles(){
    let roles = await connection.query("SELECT * FROM role;");
    console.table(roles);
    prompts();
};

async function viewEmployees(){
    let employees = await connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, CONCAT(manager.first_name,' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;");
    console.table(employees);
    prompts();
}

async function addDepartments(){
    inquirer.prompt([{
        type:"input",
        name:"department_name",
        message:"What department would you like to add?",
        }]).then(async function(data){
            let department = await connection.query("INSERT INTO department SET ?", data);
            console.log("Your deparment was added.")
            prompts();
        })
    
}

async function addRoles(){
    var departments= await connection.query("SELECT * FROM department");
    var departmentArray= departments.map(function(dept){
        return dept.id + " - " + dept.department_name;
    })
    inquirer.prompt([{
        type:"input",
        name:"title",
        message:"What role would you like to add?",
        },
        {
        type:"input",
        name:"salary",
        message:"What is the salary for this role?",
        },
        {
        type:"list",
        name:"department_id",
        message:"What is the department for this role?",
        choices: departmentArray
        }
            
    ]).then(async function(data){
        data.department_id=data.department_id.split(" - ")[0]
        let employees = await connection.query("INSERT INTO role SET ?", data);
        console.log("You have added a role.");
        prompts();
    })
    
}

async function addEmployees(){
    var roles= await connection.query("SELECT * FROM role");
    var roleArray= roles.map(function(role){
        return role.id + " - " + role.title;
    })
    var managers= await connection.query("SELECT * FROM employee");
    var managerArray= managers.map(function(mgr){
        return mgr.id + " - " + mgr.first_name + " " + mgr.last_name;
    })
    inquirer.prompt([{
        type:"input",
        name:"first_name",
        message:"What is the employee's first name?",
        },
        {
        type:"input",
        name:"last_name",
        message:"What is the employee's last name?",
        },
        {
        type:"list",
        name:"role_id",
        message:"What is the employee's role?",
        choices: roleArray
        },
        {
        type:"list",
        name:"manager_id",
        message:"Who is the employee's manager?",
        choices: managerArray
        }
    
    
    ]).then(async function(data){
        data.role_id=data.role_id.split(" - ")[0]
        data.manager_id=data.manager_id.split(" - ")[0]
    let employees = await connection.query("INSERT INTO employee SET ?", data);
    console.log("The employee was added.");
    prompts();
    });
}

async function updateRoles(){
    var roles= await connection.query("SELECT * FROM role");
    var roleArray= roles.map(function(role){
        return role.id + " - " + role.title;
    })
    var employees= await connection.query("SELECT * FROM employee");
    var employeeArray=employees.map(function(emp){
        return emp.id + " - " + emp.first_name + " " + emp.last_name;
    })
    inquirer.prompt([{
        type:"list",
        name:"id",
        message:"Which employee do you wish to update the role for?",
        choices: employeeArray
        },
        {
        type:"list",
        name:"role_id",
        message:"What is the employee's new role?",
        choices: roleArray
        },
        ]).then(async function(data){
        data.role_id=data.role_id.split(" - ")[0]
        data.id=data.id.split(" - ")[0]
    let employee = await connection.query("UPDATE employee SET role_id = ? WHERE id = ?;", [data.role_id, data.id]);
    console.log("The employee's role has been updated.");
    prompts();
    });
};

prompts();


