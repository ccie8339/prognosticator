// Initializes the `activegames` service on path `/activegames`
const { Activegames } = require('./activegames.class');
const createModel = require('../../models/activegames.model');
const hooks = require('./activegames.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/activegames', new Activegames(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('activegames');

  service.hooks(hooks);
};
