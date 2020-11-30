const { Service } = require('feathers-sequelize');
const uuid = require("uuid-random");
exports.Users = class Users extends Service {
    create (data, params) {
        data.id = uuid();
        return super.create(data);
    }
};
