module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/zh_CN');
    } catch (e) {
      return null;
    }
  });
