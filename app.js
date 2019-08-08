/**
 * @file app
 * @author atom-yang
 */
const CacheService = require('./app/utils/cache');

module.exports = app => {
  app.cache = new CacheService();
};
