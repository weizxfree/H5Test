H5
========

# 启动

### 安装nodejs
[http://nodejs.org](http://nodejs.org)
### 安装 FIS3

```
npm install fis3 -g
```

### 安装依赖包

```
npm install
```

### 启动项目

```
npm start
```

### 本地访问
http://127.0.0.1:8080/pages/

# 编译和发布

### 编译项目

```
npm run build
```

### 本地预览

```
npm run test
```

编译压缩后，放到本地服务器预览。

### 发布到测试环境

```
npm run deploy
```

具体配置命令在`package.json`中


# 架构

### 脚手架

基于[FIS](http://fis.baidu.com)前端脚手架工具：

* [Less](http://lesscss.org) CSS预处理预言，写法更方便整洁
* [Postcss](http://postcss.org) CSS后处理预言，对CSS优化处理
* [ES6](http://es6.ruanyifeng.com/) 部分使用ES6预处理JS代码
* [Uglifyjs](http://lisperator.net/uglifyjs/) 压缩JS代码

### SA.js

主JS库：sa.js，集成了`zepto.js`。

### BASKET.js

本地缓存`sa.js`，按md5戳分版本，首次请求加载，后续从`LocalStorage`中读取。

### 工具库

* [artTemplate](https://github.com/aui/artTemplate) 前端模板引擎

持续添加中。。。

### 目录结构

```

├─mock                   前端mock数据，模拟后端接口
  ├─server.conf          配置mock请求转发路由
├─node_modules           node依赖包，包含node组件和前端组件，不需要提交到git
├─modules                模块组件
├─libs								   前端JS方法库，需要提交到git，因为没有版本管理它
├─utils								   工具集
├─styles
├─scripts
├─pages                  主页面文件
├─tools                  node操作
├─fis-conf.js            FIS配置文件

```

### 自动化部署

配置入口：`var_config.json`

* `ENV`: 运行环境：`debug`本地开发环境
* `API`: 接口URL

待补充添加
