module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/tr');
    } catch (e) {
      return null;
    }
  });
