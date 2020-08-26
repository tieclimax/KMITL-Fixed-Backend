module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "ezrepair",
  // DB: "node_mysql",
  dialect: "mysql",
  timezone: "gmt",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
