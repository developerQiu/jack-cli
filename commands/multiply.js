const shell = require('shelljs');
const symbols = require('log-symbols');
const inquirer = require('inquirer');
const fs = require('fs')
const notifier = require('node-notifier');
const chalk = require('chalk');
var path = require("path");

const clone = require('../utils/clone');
const install = require('../utils/install');
const confirm = require('../utils/confirm');
const check = require('../utils/check');
const printInfo = require('../utils/print-info');

const map = {
    'test': 'https://github.com/DeveloperJackProject/LeetCode.git',
    'VueTodoList': 'https://github.com/developerQiu/VueTodoList.git'
}
let branch = 'master';

function switchMultiProject() {
    return new Promise(resolve => {
        inquirer.prompt([
            {
                type: 'checkbox',
                name: 'projectList',
                message: '请选择要下载的项目',
                choices: [
                    'test', 'VueTodoList'
                ],
                pageSize: 10,
                validate: function (input) {
                    var done = this.async();
                    if (input.length === 0) {
                        done(chalk.red('请至少选择一个项目进行下载！'));
                        return;
                    }
                    done(null, true);
                }
            }
        ]).then(answer => {
            resolve(answer)
        })
    })
}

const multiplyAction = async (name, option) => {
    printInfo();
    await check('7.6')
    // 0. 检查控制台是否可以运行`git `，
    if (!shell.which('git')) {
        console.log(symbols.error, chalk.red('对不起，git命令不可用！'));
        shell.exit(1);
    }
    const { projectList } = await switchMultiProject();
    const { confAns } = await confirm(`请确认要下载项目 ${projectList.join(' , ')} ?`)
    if (confAns) {
        for (let i = 0; i < projectList.length; i++) {
            const name = projectList[i];
            // if (fs.existsSync(name)) {
            //     console.log(symbols.warning, chalk.red(`已存在项目文件夹${name}！`));
            //     return;
            // }
            await clone(`direct:${map[name]}#${branch}`, name, { clone: true });
            await install(name);
        }
    }

};

module.exports = multiplyAction;