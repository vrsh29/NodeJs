module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/en_CA');
    } catch (e) {
      return null;
    }
  });
