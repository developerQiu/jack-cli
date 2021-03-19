const inquirer = require('inquirer');
const shell = require('shelljs');
const ora = require('ora');
const symbols = require('log-symbols');  // 用于输出图标
const chalk = require('chalk'); // 用于改变文字颜色
const notifier = require('node-notifier');

function askInstall() {
    return new Promise(resolve => {
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'ifInstall',
                message: '是否现在安装项目依赖包?',
                default: true
            }
        ]).then(answer => {
            resolve(answer)
        })
    })
}
function switchInstall() {
    return new Promise(resolve => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'installWay',
                message: '请选择安装工具',
                choices: [
                    'npm', 'cnpm', 'yarn'
                ]
            }
        ]).then(answer => {
            resolve(answer)
        })
    })
}
module.exports = async function (name) {
    return new Promise(async (resolve, reject) => {
        const { ifInstall } = await askInstall();
        if (ifInstall) {
            const { installWay } = await switchInstall();
            let spinner = ora('依赖安装中......');
            spinner.start();
            shell.exec(`cd ${name} && ${installWay} install`, (err, stdout, stderr) => {
                if (err) {
                    spinner.fail();
                    console.log(symbols.error, chalk.red(err));
                    chalk.red(err)
                }
                else {
                    spinner.succeed(chalk.green('项目依赖安装完成!'));
                    notifier.notify({
                        title: 'mc-cli',
                        message: '项目依赖安装完成!'
                    });
                }
                resolve();
            });
        } else {
            console.log(symbols.success, chalk.green('跳过安装依赖!'));
            resolve();
        }
    });
};