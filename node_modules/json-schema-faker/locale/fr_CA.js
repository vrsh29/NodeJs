module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/fr_CA');
    } catch (e) {
      return null;
    }
  });
