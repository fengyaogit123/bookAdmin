'use strict';
module.exports = (app) => {
    const { router, controller, middleware } = app;
    const { category, login, users, press, book } = controller;
    const userRequired = middleware.userRequired();
    const userAdmin = middleware.userAdmin();

    router.post("/api/book/create", userAdmin, book.create);
    router.del("/api/book/remove", userAdmin, book.remove);
    router.get("/api/book/list", userAdmin, book.list);
    router.post("/api/book/update", userAdmin, book.update)
    router.post("/api/book/borrow", userAdmin, book.borrow)
    router.get("/api/book/record", userAdmin, book.record)
    router.get("/api/book/readingAmount", userAdmin, book.readingAmount)


    router.post("/api/category/create", userAdmin, category.create);
    router.del("/api/category/remove", userAdmin, category.remove);
    router.get("/api/category/list", userAdmin, category.list);
    router.get("/api/category/allList", userAdmin, category.allList);
    router.post("/api/category/update", userAdmin, category.update)

    router.post("/api/press/create", userAdmin, press.create);
    router.del("/api/press/remove", userAdmin, press.remove);
    router.get("/api/press/list", userAdmin, press.list);
    router.get("/api/press/allList", userAdmin, press.allList);
    router.post("/api/press/update", userAdmin, press.update)

    router.post("/api/users/create", userAdmin, users.create);
    router.del("/api/users/remove", userAdmin, users.remove);
    router.get("/api/users/list", userAdmin, users.list);
    router.post("/api/users/update", userAdmin, users.update)

    // 登录校验
    router.post('/api/login', app.passport.authenticate('local', { successRedirect: '/api/login/authCallback' }));
    router.post('/api/loginOut', login.loginOut);
    router.get('/api/login/checkcode', login.checkcode);
    // 鉴权成功后的回调页面
    router.get('/api/login/authCallback', login.authCallback);
    router.get('/api/users/create', users.create);
};
