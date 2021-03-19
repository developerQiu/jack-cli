const inquirer = require('inquirer');

const confirmBase = {
    type: "confirm",
    message: "",
    name: "confAns"
};

module.exports = async function (message) {
    return new Promise(async (resolve, reject) => {
        const confirm = [{
            ...confirmBase,
            message
        }];
        inquirer.prompt(confirm).then(answer => {
            resolve(answer)
        })
    });
};