const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const allEmployees = [];

const initTeamQuestions = [
    { type: "input", name: "name", message: "What is the manager's name?" },
    { type: "input", name: "id", message: "What is the manager's ID?" },
    { type: "input", name: "email", message: "What is the manager's email?" },
    { type: "input", name: "officeNumber", message: "What is their office number?" },
    {
        type: "list",
        name: "addTeamMember",
        message: "Would you like to add another team member?",
        choices: [
            {
                name: "Yes, let's add an engineer",
                value: "engineer"
            },
            {
                name: "Yes, let's add an intern",
                value: "intern"
            },
            {
                name: "No, there are no additional team members",
                value: "no"
            }
        ]
    }
];

const newEngineerQuestions = [
    { type: "input", name: "name", message: "What is the engineer's name?" },
    { type: "input", name: "id", message: "What is the engineer's ID?" },
    { type: "input", name: "email", message: "What is the engineer's email?" },
    {
        type: "input",
        name: "github",
        message: "What is their GitHub username?"
    },
    {
        type: "list",
        name: "addTeamMember",
        message: "Would you like to add another team member?",
        choices: [
            {
                name: "Yes, let's add an engineer",
                value: "engineer"
            },
            {
                name: "Yes, let's add an intern",
                value: "intern"
            },
            {
                name: "No, there are no additional team members",
                value: "no"
            }
        ]
    }
];

const newInternQuestions = [
    { type: "input", name: "name", message: "What is the intern's name?" },
    { type: "input", name: "id", message: "What is the intern's ID?" },
    { type: "input", name: "email", message: "What is the intern's email?" },
    { type: "input", name: "school", message: "What school do they attend?" },
    {
        type: "list",
        name: "addTeamMember",
        message: "Would you like to add another team member?",
        choices: [
            {
                name: "Yes, let's add an engineer",
                value: "engineer"
            },
            {
                name: "Yes, let's add an intern",
                value: "intern"
            },
            {
                name: "No, there are no additional team members",
                value: "no"
            }
        ]
    }
];

const initTeam = () => {
    inquirer.prompt(initTeamQuestions).then(function(data) {
        console.log(data);
        const manager = new Manager(
            data.name,
            data.id,
            data.email,
            data.officeNumber
        );

        allEmployees.push(manager);
        determineNextStep(data);
    });
};

const addNewEngineer = () => {
    inquirer.prompt(newEngineerQuestions).then(function(data) {
        const engineer = new Engineer(
            data.name,
            data.id,
            data.email,
            data.github
        );

        allEmployees.push(engineer);
        determineNextStep(data);
    });
};

const addNewIntern = () => {
    inquirer.prompt(newInternQuestions).then(function(data) {
        const intern = new Intern(
            data.name,
            data.id,
            data.email,
            data.school
        );

        allEmployees.push(intern);
        determineNextStep(data);
    });
};

const determineNextStep = (data) => {
    if (data.addTeamMember === "engineer") {
        addNewEngineer();
    } else if (data.addTeamMember === "intern") {
        addNewIntern();
    } else {
        console.log("Building your html templates based on team information...");
        generateTeamPage();
    }
}

const generateTeamPage = () => {
    const htmlString = render(allEmployees);
    console.log(htmlString)

    fs.writeFile(outputPath, htmlString, function(err) {
        if (err) {
            return console.log(err);
        }
    
        console.log("Success! View the generated team page in the output folder.");
    });
}

initTeam();