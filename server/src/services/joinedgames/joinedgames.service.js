// Initializes the `joinedgames` service on path `/joinedgames`
const { Joinedgames } = require('./joinedgames.class');
const createModel = require('../../models/joinedgames.model');
const hooks = require('./joinedgames.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/joinedgames', new Joinedgames(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('joinedgames');

  service.hooks(hooks);
};
