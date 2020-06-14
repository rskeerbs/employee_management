const inquirer = require('inquirer');
const consoleTable = require('console.table');
const connection = require('./database/connection.js');
const Font = require('ascii-art-font');


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
    let employees = await connection.query("SELECT * FROM employee;");
    console.table(employees);
    prompts();
}

async function addDepartment(){
    inquirer.prompt([{
        type:"input",
        name:"departmentAdd",
        message:"What department would you like to add?",
        }])
    let department = await connection.query("INSERT INTO department VALUES departmentAdd;;");
    console.table(department);
    prompts();
}

async function addRole(){
    inquirer.prompt([{
        type:"input",
        name:"addRole",
        message:"What role would you like to add?",
        },
        {
        type:"input",
        name:"addSalary",
        message:"What is the slary for this role?",
        }
            
    ])
    let employees = await connection.query("INSERT INTO role VALUES addRole, addSalary;");
    console.table(employees);
    prompts();
}

async function addEmployee(){
    inquirer.prompt([{
        type:"input",
        name:"addFirst",
        message:"What is the employee's first name?",
        },
        {
        type:"input",
        name:"addLast",
        message:"What is the employee's last name?",
        },
        {
        type:"input",
        name:"addEmpDept",
        message:"What is the employee's role?",
        }
    
    
    ])
    let employees = await connection.query("INSERT INTO employee VALUES addFirst, addLast, addEmpDept;;");
    console.table(employees);
    prompts();
}

async function updateRoles(){
    inquirer.prompt([{
        type:"input",
        name:"employeeUpdate",
        message:"Which employee do you wish to update the role for?",
        },
        {
        type:"input",
        name:"changeRole",
        message:"What is the employee's new role?",
        },
        ])
    let departments = await connection.query("UPDATE employee SET role_id WHERE name = employeeUpdate;");
    console.table(departments);
    prompts();
};

prompts();


