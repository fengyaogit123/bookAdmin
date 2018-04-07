"use strict";
module.exports = (options) => {
    return async function (ctx, next) {
        const { user } = ctx;
        if (!user) {
            return ctx.throw(401, "请登录！");
        }
        if(!user.isAdmin){
            return ctx.throw(401, "您没有权限！");
        }
        await next();
    };
};
