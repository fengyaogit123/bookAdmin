'use strict';
const { Controller } = require("egg");
class LoginController extends Controller {
    async authCallback() {
        if (this.ctx.user && this.ctx.user.status) {
            this.ctx.status = this.ctx.user.status;
            this.ctx.body = Object.assign({}, this.ctx.user, { code: 'Unauthorized' });
            return;
        }
        let user = this.ctx.user;
        if (user.password) {
            delete user.password
        }
        this.ctx.body = user;
    }
    async loginOut() {
        this.ctx.logout();
        this.ctx.body = "";
    }
    async checkcode() {
        let { code, imgbase64 } = await this.ctx.helper.getCheckCode()
        this.ctx.session.code = code;
        this.ctx.set("Content-Type", "image/png")
        this.ctx.body = imgbase64;
    }
}
module.exports = LoginController;
