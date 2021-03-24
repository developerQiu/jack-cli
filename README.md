## 脚手架模版，欢迎下载，如果方便，点个星星，谢谢谢

## 脚手架架构设计V1.0

### 安装方式：
npm i cli-template-demo -g

### demo项目：
https://github.com/developerQiu/jack-cli.git

### 需求：
业务相关脚手架

### 范围：
整体设计，架构设计

### 技术选型：
1. Yeoman
2. commander+npm插件

### 选型结论：
简单原则，方案二可以满足日常需求，方案一属于大而全的框架，基于本需求过于厚重，所以方案二更有优势

合适原则，方案二可以根据需求，通过npm插件进行扩充，而方案一过于全面，所以方案二更有优势

演进原则，方案二和方案一都是可以用npm进行扩充，所以一二并无差别

### 项目结构设计：
```
root
｜--- commands     // 用于存放命令
｜       ｜--- run        // 所有命令总入口
｜       ｜--- init       // 初始化项目
｜       ｜--- download   // 下载项目
｜       ｜--- multiply   // 复合命令
｜
｜--- utils        // 用于存放轮子
｜       ｜--- check      // 提供脚手架运行环境检测功能， 如运行node版本，脚手架本地和线上版本比较 
｜       ｜--- clone      // 提供下载git代码功能
｜       ｜--- confirm    // 提供确认问题框
｜       ｜--- install    // 提供package.json的依赖包安装功能，包括安装确认，安装工具选择[npm / cnpm / yarn]
｜       ｜--- print-info // 提供输出欢迎信息，支持自定义内容
｜--- index.js     // 脚手架入口文件，在package.json中配置
｜--- package.json // 依赖文件，脚本入口设置
```
### 项目依赖包分析：
```
    "commander" // 必要，node.js命令行界面的完整解决方案
    "axios"     // 必要，用于发请求 
    "shelljs" // 必要，基于node的一层命令封装插件
    "download-git-repo" // 必要，用于下载git分支代码
    "inquirer" // 必要，给用户提供了一个漂亮的界面和提出问题流的方式
    "chalk"     // 优化，用于输出带颜色的文字，优化交互显示
    "log-symbols" // 优化，提供带icon的输出，优化交互显示
    "node-notifier" // 优化，对于耗时长的任务，用户无法一直专注于界面，该插件可以唤起桌面提示
    "ora" // 优化，提供loading效果，优化交互
    "semver" // 优化，提供更为方便的版本对比功能
    "moment" // 其他，时间插件
    "cowsay2"   // 其他，用于欢迎页面输入图形
    "table" // 其他，用于在界面输出table
```

### 如何使用：

下载代码后，在项目目录下使用npm link，即可进行脚手架本地开发调试

### 脚手架当前支持命令说明：

```
Usage: cli [options] [command]

Options:
  -V, --version          output the version number
  -v,--version           查看版本号
  -h, --help             display help for command

Commands:
  run                    开始
  init [options] <name>  创建项目
  download               下载已有项目
  multiply               多选下载
  help [command]         display help for command
```

### 如何发布一个npm包：（以npm为例）

```
  ### 第一步，首先选择源
  npm config set registry https://registry.npmjs.org/
  ### 第二步，登陆npm账户
  npm adduser
  ### 第三步，发布
  npm publish
```
注意：每次发布都需要更新package.json里面的version