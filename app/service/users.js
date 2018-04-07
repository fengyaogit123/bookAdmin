"use strict";
const { Service } = require("egg");

const Model = 'Users';

class UserService extends Service {
    async login({ userName, password } = {}) {
        if (!userName || !password) {
            return null;
        }
        return await this.ctx.model.Users.findOne({ userName, password });
    }
    /**----------------base-------------------**/
    async create({ _id, ...data } = {}) {
        const model = this.ctx.model[Model]
        if (!data.userName) {
            return await model.create(data);
        }
        const find = await model.findOne({
            userName: data.userName
        })
        if (!find) {
            return await model.create(data);
        }
        return this.ctx.throw(417, "账号已存在！");
    }
    async removeAll(ids) {
        return this.ctx.model[Model].remove({ _id: { $in: ids } });
    }
    async update({ _id, ...update } = {}) {
        return this.ctx.model[Model].update({ _id }, update);
    }
    async findList({ size, pageNo, ...query } = {}) {
        const { QueryPage } = this.ctx.helper;
        const model = this.ctx.model[Model];
        const result = await QueryPage({ size, pageNo }, () => {
            query = query || {};
            query.name = new RegExp(query.name)
            return model.find(query).sort({ _id: -1 });
        });
        return result;
    }
    /**----------------end-------------------**/

}
module.exports = UserService
