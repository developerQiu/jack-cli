const shell = require('shelljs');
const symbols = require('log-symbols');
const inquirer = require('inquirer');
const fs = require('fs')
const notifier = require('node-notifier');
const chalk = require('chalk'); // 用于改变文字颜色

const printInfo = require('../utils/print-info');

const initAction = require('./init');
const downloadAction = require('./download');
const multiplyAction = require('./multiply');

const featureList = [initAction, downloadAction, multiplyAction];

function switchFeature() {
    return new Promise(resolve => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'featureAns',
                message: '请选择要使用的功能！',
                choices: [
                    '0.初始化项目模版',
                    '1.下载项目',
                    '2.多功能选择'
                ]
            },
            {
                type: 'input',
                name: 'initName',
                message: '请输入要初始化的项目名：',
                when: function(ans) {
                    return ans.featureAns?.[0] === '0'
                }
            }
        ]).then(answer => {
            resolve(answer)
        })
    })
}

const runAction = async () => {
    printInfo('买菜脚手架入口')
    const { featureAns, initName } = await switchFeature();
    console.log(featureAns, initName);
    const feature = featureList[parseInt(featureAns[0])]
    await feature(initName)

}

module.exports = runAction;