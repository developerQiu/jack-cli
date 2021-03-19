#!/usr/bin/env node
const commander = require('commander');
const initAction = require('./commands/init');
const downloadAction = require('./commands/download');
const multiplyAction = require('./commands/multiply');
const runAction = require('./commands/run');

// 查看版本号
commander
    .version(require('./package.json').version)
    .option('-v,--version', '查看版本号');
    
commander
    .command('run')
    .description('开始') // 命令描述说明
    .action(runAction);

commander
    .command('init <name>') // 定义init子命令，<name>为必需参数可在action的function中接收，如需设置非必需参数，可使用中括号
    .option('-d, --dev', '获取开发版') // 配置参数，简写和全写中使用,分割
    .description('创建项目') // 命令描述说明
    .action(initAction);

commander
    .command('download')
    .description('下载已有项目')
    .action(downloadAction);

commander
    .command('multiply')
    .description('多选下载')
    .action(multiplyAction);





// 利用commander解析命令行输入，必须写在所有内容最后面
commander.parse(process.argv);