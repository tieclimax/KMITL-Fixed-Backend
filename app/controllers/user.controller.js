const db = require("../models");
const Op = db.Sequelize.Op;
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.managerBoard = (req, res) => {
  res.status(200).send("Manager Content.");
};
exports.superstaffBoard = (req, res) => {
  res.status(200).send("SuperStaff Content.");
};
exports.staffBoard = (req, res) => {
  res.status(200).send("Staff Content.");
};
