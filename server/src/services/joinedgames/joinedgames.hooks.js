

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      async context => {
        const userId = context.data.userId;
        const gameId = context.data.gameId;
        const joinedGame = await context.app.service("joinedgames").find({
          query : {
            userId: userId,
            gameId: gameId,
          }
        })
        if (joinedGame.total > 0) {
          context.result = null;
        }
      }
    ],
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
    patch: [],
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
