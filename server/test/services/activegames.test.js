const assert = require('assert');
const app = require('../../src/app');

describe('\'activegames\' service', () => {
  it('registered the service', () => {
    const service = app.service('activegames');

    assert.ok(service, 'Registered the service');
  });
});
