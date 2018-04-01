module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/de_CH');
    } catch (e) {
      return null;
    }
  });
