const { Service } = require('feathers-sequelize');
const uuid = require("uuid-random");
exports.Activegames = class Activegames extends Service {
    create(data, params) {
        data.id = uuid();
        return super.create(data);
    }
};
