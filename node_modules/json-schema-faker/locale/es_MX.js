module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/es_MX');
    } catch (e) {
      return null;
    }
  });
