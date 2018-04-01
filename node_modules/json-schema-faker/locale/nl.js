module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/nl');
    } catch (e) {
      return null;
    }
  });
