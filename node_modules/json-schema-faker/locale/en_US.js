module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/en_US');
    } catch (e) {
      return null;
    }
  });
