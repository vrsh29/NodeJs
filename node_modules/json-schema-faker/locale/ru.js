module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/ru');
    } catch (e) {
      return null;
    }
  });
