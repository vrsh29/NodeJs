module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/en_AU');
    } catch (e) {
      return null;
    }
  });
