const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  //save to database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    refreshtoken: jwt.sign(
      { user_name: req.body.username, user_email: req.body.email },
      config.refreshsecret,
      {
        expiresIn: 1209600, // 14 days
      }
    ),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return (
          res.status(404),
          send({
            message: "User not found!",
          })
        );
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jwt.sign(
        { id: user.id, username: user.username },
        config.secret,
        {
          expiresIn: 360, //
        }
      );
      var refreshtoken = jwt.sign({ id: user.id }, config.refreshsecret, {
        expiresIn: 1209600, // 14 days
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
          //refreshtoken: refreshtoken,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.refreshtoken = (req, res) => {
  User.findAll({
    where: {
      refreshtoken: req.body.refreshtoken,
    },
  });

  // res.send("Test refreshtoken");
  var refreshtoken = req.body.refreshtoken;
  if (!refreshtoken) throw createError.BadRequest();

  // var token = jwt.sign({ id: refreshtoken.id }, config.secret, {
  //   expiresIn: 360, //
  // });
  var refToken = jwt.sign({ id: refreshtoken.id }, config.refreshsecret, {
    expiresIn: 1209600, // 14 days
  });

  res.status(200).send({
    refreshtoken: refToken,
  });
};

exports.signout = (req, res) => {
  User.findOne({
    where: {
      refreshtoken: req.body.refreshtoken,
    },
  });
  var refreshtoken = req.body.refreshtoken;

  if (!refreshtoken) throw createError.BadRequest();
  else
    res.status(200).send({
      message: "fine success",
    });
};

// refreshtoken = (token) => {
//   token !== req.body.refreshtoken;
// };
// res.status(204).send("signout success");
