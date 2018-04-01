module.exports = require('../lib/')
  .extend('faker', function() {
    try {
      return require('faker/locale/pt_BR');
    } catch (e) {
      return null;
    }
  });
