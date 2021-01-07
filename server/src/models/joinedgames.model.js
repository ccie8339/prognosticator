// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const joinedgames = sequelizeClient.define('joinedgames', {
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  joinedgames.associate = function (models) {
    const { activegames, users } = models;
    joinedgames.belongsTo(users, {
      as: 'user'
    })
    joinedgames.belongsTo(activegames, {
      as: 'game'
    })
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return joinedgames;
};
