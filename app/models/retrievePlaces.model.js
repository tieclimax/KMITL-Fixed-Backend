module.exports = (sequelize, Sequelize) => {
  {
    const retrievePlaces = sequelize.define("rooms", {
      room_name: {
        type: Sequelize.STRING,
      },
      floor_name: {
        type: Sequelize.STRING,
      },
      building_name: {
        type: Sequelize.STRING,
      },
    });

    return retrievePlaces;
  }
};
