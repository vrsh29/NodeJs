module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/it');
    } catch (e) {
      return null;
    }
  });
