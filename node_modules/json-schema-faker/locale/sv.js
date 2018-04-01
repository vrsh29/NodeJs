module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/sv');
    } catch (e) {
      return null;
    }
  });
