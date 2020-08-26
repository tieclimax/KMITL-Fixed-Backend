const controller = require("../controllers/jobrequest.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Create a new jobrequest
  app.post("/api/createjobrequest/", controller.create);

  // Retrieve all jobrequest
  app.get("/api/alljobrequest/", controller.findAll);

  // Retrieve all published jobrequest
  app.get("/api/findJobBystatusID/:id", controller.findJobBystatusID);

  // Retrieve a single jobrequest with id
  app.get("/api/jobrequest/:id", controller.findOne);

  // Update a jobrequest with id
  app.put("/api/updatejobrequest/:id", controller.updatejobrequest);

  // Delete a jobrequest with id
  app.delete("/api/deletejobrequest/:id", controller.delete);

  // Delete all jobrequest
  app.delete("/api/", controller.deleteAll);

  //   app.use("/api/tutorials", router);
};
