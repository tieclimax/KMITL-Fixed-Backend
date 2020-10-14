const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and resync DB");
//   initial();
// });

app.get("/", (req, res) => res.json({ message: "welcome To Giolab." }));

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/jobrequest.routes")(app);
require("./app/routes/requester.routes")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("server is running on port : " + PORT);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
    description: "this is User mamber",
  });
  Role.create({
    id: 2,
    name: "admin",
    description: "this is admin mamber",
  });
  Role.create({
    id: 3,
    name: "manager",
    description: "this is manager mamber",
  });
  Role.create({
    id: 4,
    name: "superstaff",
    description: "this is superstaff mamber",
  });
  Role.create({
    id: 5,
    name: "staff",
    description: "this is staff mamber",
  });
}
