"use strict";
const crypto = require("crypto");
const validators = require('async-validator');
const UUID = require('uuid/v1');
/**
 * @description 格式化
 * @param {String} fmt yyyy-MM-dd hh:mm:ss
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "H+": this.getHours(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
const utils = {
    //sha256加密
    sha256(...args) {
        function $encry(str) {
            const sha256 = crypto.createHash('sha256');
            sha256.update(str);
            return sha256.digest('hex');
        }
        return $encry(args.join(''));
    },
    //判断类型函数
    is() {
        let is = {
            types: ["Array", "Function", "Boolean", "Date", "Number", "Object", "RegExp", "String", "Window", "HTMLDocument"]
        };
        for (let i = 0, c; c = is.types[i++];) {
            is[c] = (function (type) {
                return function (obj) {
                    if (type === 'Number' && isNaN(obj)) {
                        return false;
                    }
                    return Object.prototype.toString.call(obj) == "[object " + type + "]";
                };
            })(c);
        }
        return is;
    },
    //错误处理
    error(ctx, obj = {}) {
        const body = Object.assign({ code: 'server error', status: ctx.status, message: "error" }, obj);
        //未满足期望
        if (body.status == 417 || body.status == 412) {
            body.code = 'Expectation failed';
        }
        ctx.status = body.status;
        ctx.response.set("Content-Type", "application/json");
        ctx.res.end(JSON.stringify(body));
    },
    initUUID() {
        return UUID().replace(/-/g, '');
    },
    async  QueryPage({ pageNo = 1, size = 20 }, callback) {
        pageNo = +pageNo;
        size = +size;
        if (!utils.is().Number(pageNo))
            pageNo = 1;
        if (!utils.is().Number(size))
            size = 20;
        if (pageNo < 1)
            pageNo = 1;
        if (size <= 0)
            size = 20;
        if (size > 1000)
            size = 1000;
        const count = await callback().count();
        const rows = await callback().skip((pageNo - 1) * size).limit(size);
        return {
            size,
            pageNo,
            pageSize: Math.ceil(count / size),
            count,
            rows
        };
    },
    filterQuery(query = {}) {
        let result = {};
        Object.keys(query).map((key) => {
            if (query[key]) {
                result[key] = query[key];
            }
        });
        return result;
    },
    validate(rules, data) {
        return new Promise((resolve, reject) => {
            new validators(rules).validate(data, (errors, fields) => {
                if (errors) {
                    resolve({
                        status: 417,
                        code: 'invalid param',
                        message: errors[0].message
                    });
                }
                resolve();
            });
        });
    },
    async getCheckCode(ctx) {
        const captchapng = require('captchapng');
        let width = 100;
        let height = 40;
        let code = parseInt(Math.random() * 9000 + 1000);
        let p = new captchapng(width, height, code);
        p.color(0, 0, 0, 0);
        p.color(80, 80, 80, 255);
        let img = p.getBase64();
        let imgbase64 = new Buffer(img, 'base64');
        return {
            imgbase64,
            code
        }
    }
};
module.exports = utils;
