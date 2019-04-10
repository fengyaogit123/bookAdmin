module.exports = app => {
  require('./init/session')(app);
  require('./init/passLocal')(app);
  app.ready(async () => {
    require('./init/initData')(app);
  });
};
