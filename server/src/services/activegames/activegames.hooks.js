const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [
      async context => {
        try {
          const homeTeam = context.data.hometeam;
          const visitingTeam = context.data.visitingteam;
          const gameWeek = context.data.gameweek;
          const resultForward = await context.app.service("activegames").find({
            query : {
              hometeam: homeTeam,
              visitingteam: visitingTeam,
              gameweek: gameWeek
            }
          })
          if (resultForward.total > 0) {
            context.result = {
              message: "ERROR",
              data: "Game Already Exists"
            }
          }
          // Reverse Games Checked Also for Sneaky Snicker Doodles
          const resultReverse = await context.app.service("activegames").find({
            query : {
              hometeam: visitingTeam,
              visitingteam: homeTeam,
              gameweek: gameWeek
            }
          })
          if (resultReverse.total > 0) {
            context.result = {
              message: "ERROR",
              data: "Game Already Exists"
            }
          }

        } catch (Exception) {
          console.log(Exception)
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
