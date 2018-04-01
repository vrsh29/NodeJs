module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/de_AT');
    } catch (e) {
      return null;
    }
  });
