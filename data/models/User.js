const { Sequelize } = require("sequelize");
const db = require("../config/database");

const User = db.define("Users", {
  Name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Surname: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Role: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  IsBlocked: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

User.sync()
  .then(() => console.log("Table User created."))
  .catch((err) => console.log("Error: Table User not created.", err));
module.exports = User;
