module.exports = (sequelize, Sequelize) => {
  const Job_requester = sequelize.define("job_requester", {
    Job_Req_ID: {
      type: Sequelize.INTEGER,
    },
    User_ID: {
      type: Sequelize.INTEGER,
    },
    owner_job_id: {
      type: Sequelize.INTEGER,
    },
    Photo_equipment: {
      type: Sequelize.STRING,
    },
    Photo_location: {
      type: Sequelize.STRING,
    },
    Latitude: {
      type: Sequelize.STRING,
    },
    Longitude: {
      type: Sequelize.STRING,
    },
    Building: {
      type: Sequelize.STRING,
    },
    Floor: {
      type: Sequelize.STRING,
    },
    Room: {
      type: Sequelize.STRING,
    },
    Description_report: {
      type: Sequelize.STRING,
    },
    Photo_post: {
      type: Sequelize.STRING,
    },
    Description_post: {
      type: Sequelize.STRING,
    },
    Job_status_ID: {
      type: Sequelize.INTEGER,
    },
  });

  return Job_requester;
};
