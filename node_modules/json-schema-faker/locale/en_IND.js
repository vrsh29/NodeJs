module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/en_IND');
    } catch (e) {
      return null;
    }
  });
