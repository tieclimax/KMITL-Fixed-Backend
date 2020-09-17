module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "kmitl_fixed",
  dialect: "mysql",
  timezone: "gmt",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
