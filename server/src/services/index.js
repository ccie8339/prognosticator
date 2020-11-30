const users = require('./users/users.service.js');

const activegames = require('./activegames/activegames.service.js');

const joinedgames = require('./joinedgames/joinedgames.service.js');

const plays = require('./plays/plays.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);

  app.configure(activegames);
  app.configure(joinedgames);
  app.configure(plays);
};
