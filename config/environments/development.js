const path = require('path');
const logPath = path.join(__dirname, '../../logs/development.log');

module.exports = {
  web: {
    port: 3000,
  },
  logging: {
    appenders: {
      console: { type: 'console' },
      fileLog: { type: 'file', filename: logPath },
    },
    categories: {
      default: { appenders: ['fileLog', 'console'], level: 'debug' },
    },
  },
};
