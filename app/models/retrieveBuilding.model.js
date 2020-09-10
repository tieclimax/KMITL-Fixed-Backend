module.exports = (sequelize, Sequelize) => {
  {
    const retrieveBuilding = sequelize.define("building", {
      building_name: {
        type: Sequelize.STRING,
      },
      lat: {
        type: Sequelize.DOUBLE,
      },
      lng: {
        type: Sequelize.DOUBLE,
      },
    });

    return retrieveBuilding;
  }
};
