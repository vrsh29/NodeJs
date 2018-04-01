module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/id_ID');
    } catch (e) {
      return null;
    }
  });
