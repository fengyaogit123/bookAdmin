"use strict";
module.exports = (app) => {
    const mongoose = app.mongoose;
    return mongoose.model('Users', new mongoose.Schema({
        userName: String,
        password: String,
        sex:String,//性别
        name:String,//姓名
        isAdmin:Boolean,//是否是管理员
    }, {
        versionKey: false,
        timestamps: true
    }));
};
