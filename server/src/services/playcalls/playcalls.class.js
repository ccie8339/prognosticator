const {jwt_decode} = require("jwt-decode");
const { Service } = require('feathers-sequelize');
const uuid = require("uuid-random");
exports.Playcalls = class Playcalls extends Service {
    create(data, params) {
        // data.id = uuid();
        // const userId = jwt_decode(params.authentication.accessToken).
        // console.log(params.user);
        data.userId = params.user.id;
        return super.create(data);
    }
};
