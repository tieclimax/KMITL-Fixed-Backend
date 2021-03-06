const db = require("../models");
const Jobrequest = db.jobrequest;
const retrieveBuilding = db.retrieveBuilding;

const Op = db.Sequelize.Op;
// const sequelize = require("sequelize");
// Create and Save a new Jobrequest
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Latitude && !req.body.Longitude) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Jobrequest

  const User_ID = req.body.User_ID;
  const Photo_equipment1 = req.body.Photo_equipment1;
  const data_equipment1 = req.body.data_equipment1;
  const Photo_equipment2 = req.body.Photo_equipment2;
  const data_equipment2 = req.body.data_equipment2;
  const Photo_equipment3 = req.body.Photo_equipment3;
  const data_equipment3 = req.body.data_equipment3;
  const Photo_location1 = req.body.Photo_location1;
  const data_location1 = req.body.data_location1;
  const Photo_location2 = req.body.Photo_location2;
  const data_location2 = req.body.data_location2;
  const Photo_location3 = req.body.Photo_location3;
  const data_location3 = req.body.data_location3;
  const Latitude = req.body.Latitude;
  const Longitude = req.body.Longitude;
  const Building = req.body.Building;
  const Floor = req.body.Floor;
  const Room = req.body.Room;
  const Description_report = req.body.Description_report;

  // Save Jobrequest in the database
  // Jobrequest.create(createjobrequest)
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while creating the Jobrequest.",
  //     });
  //   });
  db.sequelize
    .query(
      "CALL user_send_request('" +
        User_ID +
        "','" +
        Photo_equipment1 +
        "','" +
        data_equipment1 +
        "','" +
        Photo_equipment2 +
        "','" +
        data_equipment2 +
        "','" +
        Photo_equipment3 +
        "','" +
        data_equipment3 +
        "','" +
        Photo_location1 +
        "','" +
        data_location1 +
        "','" +
        Photo_location2 +
        "','" +
        data_location2 +
        "','" +
        Photo_location3 +
        "','" +
        data_location3 +
        "','" +
        Latitude +
        "','" +
        Longitude +
        "','" +
        Building +
        "','" +
        Floor +
        "','" +
        Room +
        "','" +
        Description_report +
        "')"
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Jobrequests.",
      });
    });
};

// Retrieve all or Search Jobrequest from the database.
exports.findAll = (req, res) => {
  const Topic = req.query.Topic;
  const Search = req.query.Search;

  //***--------------- Defult Sequelize Query---------***//
  // const Null = "";
  // var condition = Building
  //   ? // ? { Building: { [Op.like]: `%${Building}%` } }
  //     { Building }
  //   : Null;
  // let sql = "CALL view_report(1)";
  // Jobrequest.findAll({ where: condition })
  //   .then((data) => {
  //     res.send(data);
  //   })
  //***--------------- End Defult Sequelize Query---------***//
  db.sequelize
    .query("CALL search_job_requesters('" + Topic + "','" + Search + "')")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Jobrequests.",
      });
    });
};

// Retrieve all  Building from the database.
exports.findAllBuilding = (req, res) => {
  db.sequelize
    .query("CALL select_allPlaces()")
    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving building.",
      });
    });
};

// Retrieve all or Search Jobrequest from the database.
exports.findRequester = (req, res) => {
  const Topic = req.query.Topic;
  const Search = req.query.Search;
  db.sequelize
    .query("CALL search_requesters('" + Topic + "','" + Search + "')")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Jobrequests.",
      });
    });
};

// Find a single Jobrequest with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Jobrequest.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
};

// Update a Jobrequest by the id in the request
exports.updatejobrequest = (req, res) => {
  const id = req.params.id;

  Jobrequest.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Jobrequest was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Jobrequest with id=${id}. Maybe Jobrequest was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Jobrequest with id=" + id,
      });
    });
};

// Delete a Jobrequest with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Jobrequest.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Jobrequest was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Jobrequest with id=${id}. Maybe Jobrequest was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Jobrequest with id=" + id,
      });
    });
};

// Delete all Jobrequest from the database.
exports.deleteAll = (req, res) => {};

// Find all published Jobrequest
exports.findJobBystatusID = (req, res) => {
  const id = req.params.id;
  Jobrequest.findAll({ where: { Job_status_ID: id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Jobrequest.",
      });
    });
  //   Jobrequest.findAll({ where: { Job_status_ID: 10 } })
  //     .then((data) => {
  //       res.send(data);
  //     })
  //     .catch((err) => {
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while retrieving Jobrequest.",
  //       });
  //     });
};

exports.managerRead = (req, res) => {
  const ID = req.body.ID;
  const owner_job_id = req.body.owner_job_id;

  db.sequelize
    .query("CALL manager_read('" + ID + "','" + owner_job_id + "')")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Jobrequests.",
      });
    });
};

exports.managerAssignjobToSuperstaff = (req, res) => {
  const ID = req.body.ID;
  const owner_job_id = req.body.owner_job_id;

  db.sequelize
    .query(
      "CALL manager_assign_job_to_super_staff('" +
        ID +
        "','" +
        owner_job_id +
        "')"
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Jobrequests.",
      });
    });
};

exports.superstaffRead = (req, res) => {
  const ID = req.body.ID;

  db.sequelize
    .query("CALL super_staff_read('" + ID + "')")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Jobrequests.",
      });
    });
};

exports.superstaffAssignjobToStaff = (req, res) => {
  const ID = req.body.ID;
  const owner_job_id = req.body.owner_job_id;

  db.sequelize
    .query(
      "CALL super_staff_assign_job_to_staff('" +
        ID +
        "','" +
        owner_job_id +
        "')"
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Jobrequests.",
      });
    });
};

exports.staffRead = (req, res) => {
  const ID = req.body.ID;

  db.sequelize
    .query("CALL staff_read('" + ID + "')")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Jobrequests.",
      });
    });
};

exports.staffGetjob = (req, res) => {
  const ID = req.body.ID;

  db.sequelize
    .query("CALL staff_get_job('" + ID + "')")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Jobrequests.",
      });
    });
};

exports.staffSendjob = (req, res) => {
  const ID = req.body.ID;
  const data_post1 = req.body.data_post1;
  const data_post2 = req.body.data_post2;
  const data_post3 = req.body.data_post3;
  const description_post = req.body.description_post;
  const job_status = req.body.job_status;

  db.sequelize
    .query(
      "CALL staff_send_job('" +
        ID +
        "','" +
        data_post1 +
        "','" +
        data_post2 +
        "','" +
        data_post3 +
        "','" +
        description_post +
        "','" +
        job_status +
        "')"
    )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Jobrequests.",
      });
    });
};

exports.CountDashboard = (req, res) => {
  db.sequelize
    .query("CALL count_dashboard()")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Jobrequests.",
      });
    });
};
