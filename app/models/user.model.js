module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("requester", {
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    refreshtoken: {
      type: Sequelize.STRING,
    },
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    tel: {
      type: Sequelize.STRING,
    },
    img_profile: {
      type: Sequelize.BLOB,
    },
  });

  return User;
};
