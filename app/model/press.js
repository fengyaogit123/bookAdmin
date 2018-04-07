//书类别
module.exports = (app) => {
    const mongoose = app.mongoose;
    return mongoose.model('Press', new mongoose.Schema({
        name: String,//出版社名称
    }, {
            versionKey: false,
            timestamps: true
        }));
};