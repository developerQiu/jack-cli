const semver = require('semver');
const axios = require('axios');
const symbols = require('log-symbols');
const chalk = require('chalk'); // 用于改变文字颜色
const ora = require('ora'); // 用于输出loading

function checkPackageVersion(url) {
  const downSpinner = ora(`脚手架版本校验中...`).start();
  const requiredVersion = require('../package.json').version;
  return new Promise((resolve, reject) => {
    axios.get(url).then(({ status, data }) => {
      if (status === 200) {
        let { version } = data; 
        if (semver.gt(version, requiredVersion)) {
          downSpinner.warn(chalk.yellow(`脚手架版本校验完成，存在新版本脚手架，版本号为${version}(当前版本号：${requiredVersion})！`));
        }else{
          downSpinner.succeed(chalk.green(`脚手架版本校验完成，当前脚手架版本为最新版！`));
        }
      } else {
        downSpinner.warn(chalk.yellow(`脚手架版本校验失败！`));
      }
      resolve();
    }, err => {
      downSpinner.warn(chalk.yellow(`脚手架版本校验失败！`));
      resolve();
    })
  });
}

function checkNodeVersion(wanted) {
  // process.version 可以获取当前的 node 版本
    const downSpinner = ora(`Node版本校验中...`).start();
  if (!semver.satisfies(process.version, `>=${wanted}`)) {
    downSpinner.fail();
    console.log(symbols.error, chalk.red(`不支持当前Node版本(${process.version})，请更新Node版本至${wanted}以上版本`));
    // 退出进程
    process.exit(1);
  }
  downSpinner.succeed(chalk.green(`Node版本校验完成！`));
}

module.exports = function (wanted) {
  return new Promise(async (resolve) => {
    checkNodeVersion(wanted)
    await checkPackageVersion('https://registry.npmjs.org/vuejs/latest')
    resolve();
  })
}