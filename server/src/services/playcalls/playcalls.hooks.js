const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  protect
} = require('@feathersjs/authentication-local').hooks;
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      authenticate("jwt"),
      async context => {
        // Validate Player has not already Submitted a Call for Current Play
        const userId = context.params.user.id;
        const gameId = context.data.gameId;
        try {
          const result = await context.app.service('playcalls').find({
            query : {
              gameId : gameId,
              userId : userId
            }
          })
          if (result.total > 0) {
            context.result = {
              error : "User has already called a play"
            }
          }
        } catch (Exception) {
          console.log(Exception);
        }
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [protect('password')],
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
