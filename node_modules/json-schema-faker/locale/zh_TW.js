module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/zh_TW');
    } catch (e) {
      return null;
    }
  });
