

module.exports = app => {
    require('./init/session')(app)
    require('./init/passLocal')(app)
};
