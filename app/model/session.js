"use strict";
module.exports = (app) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    return mongoose.model('Session', new Schema({
        key: String,
        value: String
    }, {
        versionKey: false,
    }));
};
