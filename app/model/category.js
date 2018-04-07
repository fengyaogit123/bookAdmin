//书类别
module.exports = (app) => {
    const mongoose = app.mongoose;
    return mongoose.model('Category', new mongoose.Schema({
        name: String,//类别
    }, {
            versionKey: false,
            timestamps: true
        }));
};