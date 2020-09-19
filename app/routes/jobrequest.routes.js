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

  //   Retrieve all building
  app.get("/api/findAllBuilding/", controller.findAllBuilding);
  //   Search requesters
  app.get("/api/findRequester/", controller.findRequester);

  //----------------------------Assign Flow-------------------------------//

  //Manager read
  app.post("/api/managerRead/", controller.managerRead);

  //Manager assign job to super staff
  app.post(
    "/api/managerAssignjobToSuperstaff/",
    controller.managerAssignjobToSuperstaff
  );

  //Super staff read
  app.post("/api/superstaffRead/", controller.superstaffRead);

  //Super staff Assign job To Staff
  app.post(
    "/api/superstaffAssignjobToStaff/",
    controller.superstaffAssignjobToStaff
  );

  //Staff read
  app.post("/api/staffRead/", controller.staffRead);

  //Staff get job
  app.post("/api/staffGetjob/", controller.staffGetjob);

  //Staff Send job
  app.post("/api/staffSendjob/", controller.staffSendjob);

  // Count dashboard
  app.get("/api/CountDashboard/", controller.CountDashboard);

  //---------------------------- End Assign Flow-------------------------------//
};
