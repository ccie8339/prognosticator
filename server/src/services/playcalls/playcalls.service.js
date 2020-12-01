// Initializes the `playcalls` service on path `/playcalls`
const { Playcalls } = require('./playcalls.class');
const createModel = require('../../models/playcalls.model');
const hooks = require('./playcalls.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/playcalls', new Playcalls(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('playcalls');

  service.hooks(hooks);
};
