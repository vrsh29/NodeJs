module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/en_au_ocker');
    } catch (e) {
      return null;
    }
  });
