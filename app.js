const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// const choices = require("inquirer/lib/objects/choices");
const Employee = require("./lib/Employee");
// const { type } = require("os");
const employees = [];

async function memberRole(){
    inquirer.prompt({
        type:"list",
        name:"type",
        message:"Choose team members role ",
        choices:["Manager",
                "Intern",
                "Engineer"]
    }).then(val => {
   if (val.type === "Manager"){
        addManager();
        createTeam();
        // console.log("manager add")
    }else if (val.type === "Intern"){
        addIntern();
        // console.log("Imtern add")
    } else {
        addEngineer();
        // console.log("engineer add")
    }
})
}
 function addManager() {
        inquirer.prompt([{
            type: "input",
            name: "name",
            message: "Enter manager's first name"
        },
        {
            type: "input",
            name: "id",
            message: "Enter manager's id"
        },
        {
            type: "input",
            name: "email",
            message: "Enter manager's E-mail"
        },
        {
            type:"input",
            name:"officeNumber",
            message:"Enter manager's office number"
        }
        ]).then(function ({name, id, email, officeNumber }) {
            this.employee = new Manager(name, id, email, officeNumber);
            employees.push(this.employee);
            console.log(employees);
        }).then(function addAnother(){
            inquirer.prompt({
                type:"confirm",
                name:"add",
                message:"Would you like to add more members?"
            }).then(val =>{
                if(val.add){
                    memberRole();
                }else{
                    createTeam();
                }
            })
        })
    }
    function addIntern() {
        inquirer.prompt([{
            type: "input",
            name: "name",
            message: "Enter intern's first name"
        },
        {
            type: "input",
            name: "id",
            message: "Enter intern's id"
        },
        {
            type: "input",
            name: "email",
            message: "Enter intern's E-mail"
        },
        {
            type:"input",
            name:"school",
            message:"Enter intern's school name"
        }
        ]).then(function ({name, id, email, school }) {
            this.employee = new Intern(name, id, email, school);
            employees.push(this.employee);
            console.log(employees);
        }).then(function addAnother(){
            inquirer.prompt({
                type:"confirm",
                name:"add",
                message:"Would you like to add more members?"
            }).then(val =>{
                if(val.add){
                    memberRole();
                }else{
                    createTeam();
                }
            })
        })
    }
    function addEngineer() {
        inquirer.prompt([{
            type: "input",
            name: "name",
            message: "Enter engineer's first name"
        },
        {
            type: "input",
            name: "id",
            message: "Enter engineer's id"
        },
        {
            type: "input",
            name: "email",
            message: "Enter engineer's E-mail"
        },
        {
            type:"input",
            name:"github",
            message:"Enter engineer's github username"
        }
        ]).then(function ({name, id, email, github }) {
            this.employee = new Engineer(name, id, email, github);
            employees.push(this.employee);
            console.log(employees);
        }).then(function addAnother(){
            inquirer.prompt({
                type:"confirm",
                name:"add",
                message:"Would you like to add more members?"
            }).then(val =>{
                if(val.add){
                    memberRole();
                }else{
                    createTeam();
                }
            })
        })
    }
    function createTeam(){
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(employees), "utf-8");
    
    }
    

memberRole()

