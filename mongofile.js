// Update with your config settings.

module.exports = {

  development: {
      "db": {
        "connection": "mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study",
        "name": "testdb"
      }
  },

  staging: {
    "db": {
      "connection": "mongodb://localhost",
      "name": "testdb"
    }
  },

  production: {
    "db": {
      "connection": "mongodb://localhost",
      "name": "testdb"
    }
  }

};