# 介绍
    由于最近需要做一个简单的图书管理系统，于是就用了vue前后端分离的开发模式

## 技术栈
```js
    //前端 https://github.com/fengyaogit123/bookqd.git
    1.vue
    2.vue-router
    3.vuex
    4.iview
    5.axios

    //后端 https://github.com/fengyaogit123/bookAdmin.git
    1.Node
    2.Eggjs
    3.Mongodb + Mongoose

```

## 安装
```js
    //确认已经安装mongodb  这里默认配置是 
    config.mongoose = {
        url: 'mongodb://127.0.0.1:27017/book',
        options: {},
    };
    //没有设置账号密码 ，确保mongo服务已经打开

    //前端项目地址 https://github.com/fengyaogit123/bookqd.git
    $ git clone  https://github.com/fengyaogit123/bookAdmin.git
    $ cd bookAdmin
    $ npm i
    $ npm run dev 

    //打开地址 http://127.0.0.1:7001/public/web/index.html  查看
```
