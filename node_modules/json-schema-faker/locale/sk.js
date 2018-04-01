module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/sk');
    } catch (e) {
      return null;
    }
  });
