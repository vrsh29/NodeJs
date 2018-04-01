module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/vi');
    } catch (e) {
      return null;
    }
  });
