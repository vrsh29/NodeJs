module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/ge');
    } catch (e) {
      return null;
    }
  });
