module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/es');
    } catch (e) {
      return null;
    }
  });
