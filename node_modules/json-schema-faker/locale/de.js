module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/de');
    } catch (e) {
      return null;
    }
  });
