// const {jwt_decode} = require("jwt-decode");
const { Service } = require('feathers-sequelize');
const uuid = require("uuid-random");
exports.Playcalls = class Playcalls extends Service {
    create(data, params) {
        data.userId = params.user.id;
        return super.create(data);
    }
};
