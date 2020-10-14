const controller = require("../controllers/jobrequest.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

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

  // Count dashboard 
  app.get("/api/CountDashboard/", controller.CountDashboard);

  // History user
  app.get("/api/Historyuser/", controller.Historyuser);

  app.get("/api/dropdown/", controller.dropdown);

  
//------------------------------main flow--------------------------------------------------//

  // Create a new jobrequest
  app.post("/api/createjobrequest/", controller.create);

  // Job To Manager
  app.get("/api/JobToManager/", controller.JobToManager);

  // Manager read
  app.post("/api/managerRead/", controller.managerRead);

  // Retrieve Superstaff for Manager
  app.get("/api/ManagerSelectSuperstaff/", controller.ManagerSelectSuperstaff);

  //Manager assign job to super staff
  app.post("/api/managerAssignjobToSuperstaff/", controller.managerAssignjobToSuperstaff);

  // Job To Superstaff
  app.get("/api/JobToSuperstaff/", controller.JobToSuperstaff);

  // Super staff read
  app.post("/api/superstaffRead/", controller.superstaffRead);

  // Retrieve Staff for Supperstaff
  app.get("/api/SuperstaffSelectStaff/", controller.SuperstaffSelectStaff);

  // Super staff Assign job To Staff
  app.post("/api/superstaffAssignjobToStaff/", controller.superstaffAssignjobToStaff);

  // Job To Staff
  app.get("/api/JobToStaff/", controller.JobToStaff);

  // Staff read
  app.post("/api/staffRead/", controller.staffRead);

  // Staff get job
  app.post("/api/staffGetjob/", controller.staffGetjob);

  //Staff Send job
  app.post("/api/staffSendjob/", controller.staffSendjob);

//------------------------------end main flow--------------------------------------------------//

};
