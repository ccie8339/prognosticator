
const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [
      context => {
        context.params.sequelize = {
          include: [
            {
              model: context.app.services['activegames'].Model,
              attributes: ['channel'],
              as: 'game'
            }
          ]
        }
        // raw: false
        return context;
      }
    ],
    get: [
      context => {
        context.params.sequelize = {
          include: [
            {
              model: context.app.services['activegames'].Model,
              attributes: ['channel'],
              as: 'game'
            }
          ]
        }
        // raw: false
        return context;
      }
    ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [
      async context => {
        const gameId = context.result.gameId;
        await context.app.service('plays').create({
          gameId: gameId
        })
        return context;
      }
    ],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
