module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/nep');
    } catch (e) {
      return null;
    }
  });
