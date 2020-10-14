const controller = require("../controllers/requester.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Search requesters
  app.get("/api/findRequester/", controller.findRequester);

  // Edit Profile
  app.put("/api/EditProfile/", controller.EditProfile);

  // Change password
  app.put("/api/ChangePassword/", controller.ChangePassword);

};