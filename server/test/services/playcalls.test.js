const assert = require('assert');
const app = require('../../src/app');

describe('\'playcalls\' service', () => {
  it('registered the service', () => {
    const service = app.service('playcalls');

    assert.ok(service, 'Registered the service');
  });
});
