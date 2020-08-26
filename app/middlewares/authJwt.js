const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No Token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};
verifyRefreshToken = (req, res, next) => {
  let refreshtoken = req.headers["x-access-token"];

  if (!refreshtoken) {
    return res.status(403).send({
      message: "No refreshtoken provided!",
    });
  }

  jwt.verify(refreshtoken, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Admin Role!",
      });
      return;
    });
  });
};
isManager = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "manager") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Manager Role!",
      });
    });
  });
};
isSuperstaff = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "superstaff") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Superstaff Role!",
      });
    });
  });
};
isStaff = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "staff") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Staff Role!",
      });
    });
  });
};

isSuperstaffOrstaff = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "superstaff") {
          next();
          return;
        }
        if (roles[i].name === "staff") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Superstaff and Staff Role!",
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isManager: isManager,
  isSuperstaff: isSuperstaff,
  isStaff: isStaff,
  isSuperstaffOrstaff: isSuperstaffOrstaff,
  verifyRefreshToken: verifyRefreshToken,
};

module.exports = authJwt;
