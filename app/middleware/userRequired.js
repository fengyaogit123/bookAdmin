"use strict";
module.exports = (options) => {
    return async function (ctx, next) {
        const { user } = ctx;
        if (!user) {
            return ctx.throw(401, "请登录！");
        }
        await next();
    };
};
