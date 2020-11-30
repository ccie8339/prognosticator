const assert = require('assert');
const app = require('../../src/app');

describe('\'plays\' service', () => {
  it('registered the service', () => {
    const service = app.service('plays');

    assert.ok(service, 'Registered the service');
  });
});
