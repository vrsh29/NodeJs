module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/nb_NO');
    } catch (e) {
      return null;
    }
  });
