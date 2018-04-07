"use strict";
const { Service } = require("egg");

const Model = 'Category';

class CategoryService extends Service {
    /**----------------base-------------------**/
    async create({ _id, ...data } = {}) {
        const model = this.ctx.model[Model]
        return await model.create(data);
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
module.exports = CategoryService
