module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/ja');
    } catch (e) {
      return null;
    }
  });
