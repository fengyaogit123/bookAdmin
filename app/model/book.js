"use strict";
module.exports = (app) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    return mongoose.model('Book', new mongoose.Schema({
        name: String,//书名
        author: String,//作者
        desc: String,//描述
        borrowStatus: Number,//借阅状态 0 未借  1已借
        stock: Number,//库存
        borrowTotal: Number,//借阅次数
        category: { type: Schema.Types.ObjectId, ref: 'Category' },//类别
        press: { type: Schema.Types.ObjectId, ref: 'Press' },//出版社
    }, {
            versionKey: false,
            timestamps: true
        }));
};
