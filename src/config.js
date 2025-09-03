const config = require('config');
require('dotenv').config();

module.exports = {
  port: process.env.PORT || config.get('port'),
  logLevel: process.env.LOG_LEVEL || config.get('logLevel'),
  secretToken: process.env.SECRET_TOKEN || ''
};
