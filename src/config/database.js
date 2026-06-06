const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2");

const sequelize = new Sequelize(
  process.env.DB_name,
  process.env.DB_user,
  process.env.DB_password,
  {
    host: process.env.DB_host,
    port: process.env.DB_port || 3306,
    dialect: "mysql",
    dialectModule: mysql2,
    logging: false
  }
);

module.exports = sequelize;
