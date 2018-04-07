"use strict";
const { Service } = require("egg");

const Model = 'Book';

class BookService extends Service {
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
        const { QueryPage, filterQuery } = this.ctx.helper;
        const model = this.ctx.model[Model];
        const result = await QueryPage({ size, pageNo }, () => {
            let find = filterQuery(query)
            find.name = new RegExp(find.name)
            find.author = new RegExp(find.author)
            find.$and = []

            if (find.borrowStatus == 0) {
                find.borrowStatus = { $in: ['', 0] }
            }
            if (find.createdAt) {
                let date = new Date(find.createdAt)
                let hdate = new Date(+date + 24 * 3600 * 1000);
                find.$and.push({ createdAt: { $gt: date } })
                find.$and.push({ createdAt: { $lt: hdate } })
                delete find.createdAt
            }
            if (!find.$and.length) {
                delete find.$and;
            }
            return model.find(find).sort({ _id: -1 }).populate([{
                path: "category",
                select: "name",
            }, {
                path: "press",
                select: "name",
            }]);
        });
        return result;
    }
    /**----------------end-------------------**/
    //借还书
    async borrow({ _id, userId, borrowStatus }) {
        const { Users, Book, Borrow } = this.ctx.model;
        const user = await Users.findOne({ _id: userId })
        if (!user) this.ctx.throw(417, "读者不存在!")
        //还书需要判断是否借出过
        if (borrowStatus != 1) {
            //判断用户是否有借书
            let borrow = await Borrow.findOne({
                book: _id,
                user: user._id,
            });
            if (!borrow) {
                return this.ctx.throw(417, "用户没有借这本书!")
            }
            await Book.update({ _id }, { borrowStatus })
        } else {
            //借书需要 改变状态，借阅+1
            await Book.update({ _id }, { borrowStatus, $inc: { borrowTotal: 1 } })
        }
        return await Borrow.update({
            book: _id,
            user: user._id,
        }, {
                book: _id,
                user: user._id,
                borrowStatus
            }, { upsert: true })
    }
    async record({ size, pageNo, ...query } = {}) {
        const { QueryPage, filterQuery } = this.ctx.helper;
        const model = this.ctx.model.Borrow;
        const result = await QueryPage({ size, pageNo }, () => {
            let find = filterQuery(query)
            find.user = find.userId
            find.borrowStatus = 1
            delete find.userId;
            return model.find(find).sort({ _id: -1 }).populate([{
                path: "book",
                options: {
                    borrowStatus: { $ne: 1 }
                }
            }, {
                path: "user",
            }]);
        });
        return result;
    }
}
module.exports = BookService
