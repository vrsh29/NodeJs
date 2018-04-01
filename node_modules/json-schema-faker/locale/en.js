module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/en');
    } catch (e) {
      return null;
    }
  });
