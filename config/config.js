const _ = require('lodash');

// module variables
const config = require('./config.json');
const defaultConfig = config.production;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);
// and their names should always begin with g
global.gConfig = finalConfig;

// log global.gConfig
console.log(`global.gConfig: ${JSON.stringify(global.gConfig, undefined, global.gConfig.json_indentation)}`);

module.exports = {
  'secret': 'supersecret',
  'refreshTokenSecret': 'testsecretrefresh',
};
