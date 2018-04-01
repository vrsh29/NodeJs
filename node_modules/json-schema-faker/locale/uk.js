module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/uk');
    } catch (e) {
      return null;
    }
  });
