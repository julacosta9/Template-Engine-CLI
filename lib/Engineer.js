const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, githubProfileName) {
        super(name, id, email);
        this.github = githubProfileName;
        this.role = "Engineer"; 
    }

    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;