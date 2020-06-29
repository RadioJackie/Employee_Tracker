const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table")

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Jackass21!",
    database: "employee_trackerDB"
});

connection.connect(function (err) {
    if (err) throw err;

    console.log("connection id", connection.threadId);
    displayMenu()
});

function displayMenu() {
    inquirer.prompt({
        name: "choice",
        type: "list",
        message: "What would you like to to?",
        choices: [
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View All Roles",
            "Add Role",
            "Remove Role",
            "View All Department",
            "Add Department",
            "Remove Department",
            "Quit"
        ]

    }).then(function (userInput) {
        switch (userInput.choice) {
            case "View All Employees":
                viewEmployees();
                break;
            case "View All Employees by Department":
                viewByDepartments();
                break;
            case "View All Employees by Manager":
                viewByManager();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Remove Employee":
                removeEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Update Employee Manager":
                updateEmployeeManager();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Role":
                addRole();
                break;
            case "Remove Role":
                removeRole();
                break;
            case "View All Departments":
                viewAllDepartments();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Remove Department":
                removeDepartment();
                break;
            case "Quit":
                console.log("Buh Bye");
                break;
        };
    });
};
function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, results) {
        console.table(results);
        displayMenu();
    })
}
function viewByDepartments() {
    connection.query("SELECT * FROM department", function (err, results) {
        console.table(results);
        displayMenu();
    })
}
function viewByManager() {
    connection.query("SELECT * FROM manager", function (err, results) {
        console.table(results);
        displayMenu();
    })
}
function viewAllRoles() {
    connection.query("SELECT * FROM role", function (err, results) {
        console.table(results);
        displayMenu();
    })
}
function  viewAllDepartments(){
    let query = "SELECT * FROM department";
    connection.query(query, function(error, res) {
        if (err) throw err;
        console.table(res);
        displayMenu()
    }
    )
};
function addEmployee() {
    let roleList = [];
    let newEmployee = [
        {
            type: "input",
            message: "What is the Employee's first name?",
            name: "firstName"
        },
        {
            type: "input",
            message: "What is the Employee's last name?",
            name: "lastName"
        },
    ];
    inquirer.prompt(newEmployee).then(function (response) {
        connection.query("SELECT * FROM employee_role", function (err, results) {
            if (err) throw err;
            for (let index = 0; index < results.length; index++) {
                roleList.push(results[index].title);
            }
            inquirer.prompt({
                type: "list",
                message: "Please select a Role for this Employee",
                choices: roleList,
                name: "newRole"
            })
            .then(function (userInput) {
                    let roleId;
                    connection.query("SELECT * FROM employee_role WHERE title = '" + userInput.newRole + "'", function (err, results) {
                        if (err) throw err;
                        roleId = results[0].id;
                        let query = "INSERT INTO employee (first_name, last_name, role_id) VALUES ('" + response.firstName + "', '" + response.lastName + "', '" + roleId + "')";
                        connection.query(query, function (err, results) {
                            if (err) throw err;
                            console.log("New Employee added");
                            displayMenu();
                        })
                    })
            })
        });
    });
};
function viewByDepartments() {
    inquirer.prompt([
        {
            name: "departmentChoice",
            type: "list",
            message: "Which department would you like to view?",
            choices: [
                "Sales",
                "Engineering",
                "Finance",
                "Legal"
            ]
        }
    ])
};

function addDepartment() {
    let newDepartment = [
        {
            type: "input",
            message: "What Depatment would you like to add?",
            name: "dept"
        }
    ];
    inquirer.prompt(newDepartment)
            .then(function (userInput) {
                    let query = "INSERT INTO department (dept_name) VALUES ('" + userInput.departmentname + "')";
                    connection.query(query, function (err, results) {
                        if (err) throw err;
                        console.log("New Department added");
                        displayMenu();
                    })
                })
            };
function removeDepartment() {
    inquirer.prompt({
        type: "input",
        message: "What Depatment would you like to remove?",
        name: "dept"
    }).then(function (answer) {
        let query = "INSERT INTO department (dept_name) VALUES ('" + answer.dept + "')";
        connection.query(query, function (err, results) {
            console.log("Department removed");
            displayMenu();
        })
    })
}