"use strict";
const utils = require("../utils/utils");
module.exports = {
    async validate(rule, data) {
        let result = await utils.validate(rule, data);
        result && this.throw(result.status, result.message);
    }
};
