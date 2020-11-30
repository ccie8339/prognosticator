const assert = require('assert');
const app = require('../../src/app');

describe('\'joinedgames\' service', () => {
  it('registered the service', () => {
    const service = app.service('joinedgames');

    assert.ok(service, 'Registered the service');
  });
});
