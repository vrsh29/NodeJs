module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/fa');
    } catch (e) {
      return null;
    }
  });
