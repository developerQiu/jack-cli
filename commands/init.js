const shell = require('shelljs');
const symbols = require('log-symbols');
const fs = require('fs')
const notifier = require('node-notifier');
const chalk = require('chalk'); // 用于改变文字颜色

const clone = require('../utils/clone.js');
const install = require('../utils/install');
const check = require('../utils/check');
const printInfo = require('../utils/print-info');

let branch = 'master';
const remote = 'https://github.com/DeveloperJackProject/LeetCode.git';

const initAction = async (name, option = {}) => {
    printInfo()
    await check('7.6')
    // 0. 检查控制台是否可以运行`git `，
    if (!shell.which('git')) {
        console.log(symbols.error, chalk.red('对不起，git命令不可用！'));
        shell.exit(1);
    }
    // 1. 验证输入name是否合法
    if (fs.existsSync(name)) {
        console.log(symbols.warning, chalk.red(`已存在项目文件夹${name}！`));
        return;
    }
    if (name.match(/[^A-Za-z0-9\u4e00-\u9fa5_-]/g)) {
        console.log(symbols.error, chalk.red('项目名称存在非法字符！'));
        return;
    }
    // 2. 获取option，确定模板类型（分支）
    if (option.dev) branch = 'develop';
    // 4. 下载模板
    await clone(`direct:${remote}#${branch}`, name, { clone: true });
    await install(name);
};

module.exports = initAction;