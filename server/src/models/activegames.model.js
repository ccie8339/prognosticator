// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const activegames = sequelizeClient.define('activegames', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      unique: true,
      default: Sequelize.UUIDV4,
      primaryKey: true
    },
    started: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    hometeam: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    },
    visitingteam: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    },
    gameweek: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  activegames.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return activegames;
};
