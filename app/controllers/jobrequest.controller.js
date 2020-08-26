const db = require("../models");
const Jobrequest = db.jobrequest;
const Op = db.Sequelize.Op;

// Create and Save a new Jobrequest
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Photo_equipment) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Jobrequest
  const createjobrequest = {
    Job_Req_ID: req.body.Job_Req_ID,
    User_ID: req.body.User_ID,
    owner_job_id: req.body.owner_job_id,
    Photo_equipment: req.body.Photo_equipment,
    Photo_location: req.body.Photo_location,
    Latitude: req.body.Latitude,
    Longitude: req.body.Longitude,
    Building: req.body.Building,
    Floor: req.body.Floor,
    Room: req.body.Room,
    Description_report: req.body.Description_report,
    Photo_post: req.body.Photo_post,
    Description_post: req.body.Description_post,
    Job_status_ID: req.body.Job_status_ID ? req.body.Job_status_ID : 1,
  };

  // Save Jobrequest in the database
  Jobrequest.create(createjobrequest)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Jobrequest.",
      });
    });
};

// Retrieve all Jobrequest from the database.
exports.findAll = (req, res) => {
  const Building = req.query.Building;
  var condition = Building
    ? { Building: { [Op.like]: `%${Building}%` } }
    : null;

  Jobrequest.findAll({ where: condition })
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
