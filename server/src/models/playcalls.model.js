// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const playcalls = sequelizeClient.define('playcalls', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      unique: true,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    play: {
      type: DataTypes.STRING(5),
      allowNull: false,
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  playcalls.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    const { activegames, users } = models;
    playcalls.belongsTo(activegames, {
      as: 'game'
    }),
    playcalls.belongsTo(users, {
      as: 'user'
    })
  };

  return playcalls;
};
