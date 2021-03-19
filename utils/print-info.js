'use strict';
 const chalk = require('chalk');
 const cowsay = require('cowsay2');
 const moment = require('moment');
 const { table } = require('table');
 const dragonAndCow = require('cowsay2/cows/dragon-and-cow');
 
 function newLine(lineCount = 1) {
     for (let i = 0; i < lineCount; i++) {
         console.log('');
     }
 }
 
 const rows = [];
 
 function printRow(...args) {
     rows.push(args);
 }
 
 module.exports = function(featureName = "未设置功能") {
    let buildTime = moment().utcOffset(8).format('YY/MM/DD, HH:mm:ss');
     console.log(
         cowsay.say('欢迎使用买菜脚手架，请认真阅读README', {
             cow: dragonAndCow
         })
     );
     newLine();
     printRow('使用时间', chalk.yellow(buildTime));
     printRow('使用功能', chalk.green(`${featureName}`));
     printRow('相关文档', chalk.green('地址地址地址'));
     printRow(
         '联系方式',
         chalk.hex('#30d8db')('方式，方式，方式，方式')
     );
     newLine();
     const output = table(rows, {});
     console.log(output);
 };
 