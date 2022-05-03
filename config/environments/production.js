module.exports = {
  web: {
    port: process.env.PORT,
  },
  logging: {
    appenders: { console: { type: 'console', layout: { type: 'basic' } } },
  },
};
