module.exports = async app => {
  const { Users } = app.model;
  const count = await Users.count();
  if (count === 0) {
    await Users.create({
      userName: 'admin',
      password: 'admin',
      name: '管理员',
      isAdmin: true,
    });
  }
};
