module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/fr');
    } catch (e) {
      return null;
    }
  });
