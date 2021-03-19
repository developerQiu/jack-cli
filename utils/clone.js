const download = require('download-git-repo');
const symbols = require('log-symbols');  // 用于输出图标
const ora = require('ora'); // 用于输出loading
const chalk = require('chalk'); // 用于改变文字颜色
const notifier = require('node-notifier');
module.exports = function (remote, name, option) {
    const downSpinner = ora(`正在下载${name}模板...`).start();
    return new Promise((resolve, reject) => {
        download(remote, name, option, err => {
            if (err) {
                downSpinner.fail();
                console.log(symbols.error, chalk.red(err));
                reject(err);
                return;
            };
            downSpinner.succeed(chalk.green(`项目${name}创建成功！`));
            notifier.notify({
                title: 'mc-cli',
                message: `项目${name}创建成功！`
            });
            resolve();
        });
    });
};