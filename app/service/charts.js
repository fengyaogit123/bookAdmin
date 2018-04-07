"use strict";
const { Service } = require("egg");


class ChartService extends Service {
    //图书借阅量统计图
    async readingAmount() {
        const { Book } = this.ctx.model;
        const size = 10;//统计前10
        return await Book.find({}).sort({ borrowTotal: -1 }).skip(0).limit(size).populate([{
            path: "category"
        }, {
            path: "press"
        }])
    }
}
module.exports = ChartService
