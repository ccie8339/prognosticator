
module.exports = {
  "host": "localhost",
  "port": 3030,
  "public": "../public/",
  "paginate": {
    "default": 10,
    "max": 50
  },
  "authentication": {
    "entity": process.env.AUTH_ENTITY,
    "service": process.env.AUTH_SERVICE,
    "secret": process.env.AUTH_SECRET,
    "authStrategies": [
      "jwt",
      "local"
    ],
    "jwtOptions": {
      "header": {
        "typ": "access"
      },
      "audience": "https://yourdomain.com",
      "issuer": "feathers",
      "algorithm": process.env.AUTH_JWT_OPTIONS_ALGORITHM,
      "expiresIn": process.env.AUTH_JWT_OPTIONS_EXPIRESIN
    },
    "local": {
      "usernameField": process.env.AUTH_USERNAME_FIELD,
      "passwordField": process.env.AUTH_PASSWORD_FIELD
    }
  },
  "mysql": `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SCHEMA}`
}
