//借书记录
module.exports = (app) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema
    return mongoose.model('Borrow', new mongoose.Schema({
        book: { type: Schema.Types.ObjectId, ref: 'Book' },//书_id
        user: { type: Schema.Types.ObjectId, ref: 'Users' },//读者
        borrowStatus:Number,//借阅状态
    }, {
            versionKey: false,
            timestamps: true
        }));
};