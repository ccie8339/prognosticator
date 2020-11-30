// Initializes the `plays` service on path `/plays`
const { Plays } = require('./plays.class');
const createModel = require('../../models/plays.model');
const hooks = require('./plays.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/plays', new Plays(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('plays');

  service.hooks(hooks);
};
