const { Service } = require('feathers-sequelize');
const uuid = require("uuid-random");
exports.Plays = class Plays extends Service {
    create(data, params) {
        data.id = uuid();
        return super.create(data);
    }
};
