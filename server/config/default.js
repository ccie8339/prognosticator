
module.exports = {
  "host": "localhost",
  "port": 3030,
  "public": "../public/",
  "paginate": {
    "default": 100,
    "max": 500
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
      "issuer": process.env.AUTH_JWT_OPTIONS_ISSUER,
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
