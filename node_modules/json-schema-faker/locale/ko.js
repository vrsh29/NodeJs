module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/ko');
    } catch (e) {
      return null;
    }
  });
