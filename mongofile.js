// Update with your config settings.

module.exports = {

  development: {
      "db": {
        "connection": "mongodb://************************************************",
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
