//用户
'use strict';
const { Controller } = require("egg");
const Modal = "users"
class UserController extends Controller {
    /** ------------------base------------------- */
    async create() {
        const rule = {
            sex: { type: "string", required: true, message: "必填项" },
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
    async update(){
        const rule = {
            _id: [{ type: "string", required: true, message: "id不存在" }],
        };
        this.ctx.body = await this.service[Modal].update(this.ctx.request.body)
    }
    /**——————————————————————end—————————————————————— */
}
module.exports = UserController;
