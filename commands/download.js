const shell = require('shelljs');
const symbols = require('log-symbols');
const inquirer = require('inquirer');
const fs = require('fs')
const notifier = require('node-notifier');
const chalk = require('chalk'); // 用于改变文字颜色

const clone = require('../utils/clone.js');
const install = require('../utils/install');
const check = require('../utils/check');

const map = {
    'test': 'https://github.com/DeveloperJackProject/LeetCode.git',
    'mall-wxapp': 'ssh://git@git.sankuai.com/octopus/mall-wxapp.git'
}
let branch = 'master';

function switchProject() {
    return new Promise(resolve => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'projectName',
                message: '请选择要下载的项目',
                choices: [
                    'test', 'mall-wxapp'
                ]
            }
        ]).then(answer => {
            resolve(answer)
        })
    })
}

const downloadAction = async (name, option) => {
    await check('7.6')
    // 0. 检查控制台是否可以运行`git `，
    if (!shell.which('git')) {
        console.log(symbols.error, chalk.red('对不起，git命令不可用！'));
        shell.exit(1);
    }
    const proAns = await switchProject();
    // 1. 验证输入name是否合法
    if (fs.existsSync(proAns.projectName)) {
        console.log(symbols.warning, chalk.red(`已存在项目文件夹${proAns.projectName}！`));
        return;
    }
    await clone(`direct:${map[proAns.projectName]}#${branch}`, proAns.projectName, { clone: true });
    await install(proAns.projectName);

};

module.exports = downloadAction;