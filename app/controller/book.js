'use strict';
const { Controller } = require("egg");
const Modal = "book"
class BookController extends Controller {
    /** ------------------base------------------- */
    async create() {
        const rule = {
            name: { type: "string", required: true, message: "必填项" },
        };
        const data = this.ctx.request.body;
        await this.ctx.validate(rule, data);
        this.ctx.body = await this.service[Modal].create(data)
    }
    async remove() {
        const rule = {
            ids: [{ type: "array", required: true, min: 1, message: "ids验证错误，应为不为空的数组" }],
        };
        const data = this.ctx.request.body;
        await this.ctx.validate(rule, data);
        this.ctx.body = await this.service[Modal].removeAll(data.ids)
    }
    async list() {
        this.ctx.body = await this.service[Modal].findList(this.ctx.query)
    }
    async update() {
        const rule = {
            _id: [{ type: "string", required: true, message: "id不存在" }],
        };
        const data = this.ctx.request.body;
        await this.ctx.validate(rule, data);
        this.ctx.body = await this.service[Modal].update(this.ctx.request.body)
    }
    /**------------------ end ------------------- */
    //借还书
    async borrow() {
        const rule = {
            _id: [{ type: "string", required: true, message: "id不存在" }],
            userId:[{ type: "string", required: true, message: "读者不存在" }],
            borrowStatus:[{ type: "string", required: true, message: "borrowStatus 为空" }],
        };
        const data = this.ctx.request.body;
        await this.ctx.validate(rule, data);
        this.ctx.body = await this.service[Modal].borrow(data)
    }
    //查询用户借阅记录
    async record(){
        const rule = {
            userId:[{ type: "string", required: true, message: "读者不存在" }],
        };
        const data = this.ctx.query;
        await this.ctx.validate(rule, data);
        this.ctx.body = await this.service[Modal].record(data)
    }
    //统计前10
    async readingAmount(){
        this.ctx.body = await this.service.charts.readingAmount();
    }
}
module.exports = BookController;
