/**
 * @file app
 * @author atom-yang
 */
const CacheService = require('./app/utils/cache');

module.exports = app => {
  app.cache = new CacheService();
  const {
    cacheKey
  } = app.config;
  Object.values(cacheKey).forEach(value => {
    app.cache.initCache(value.name, value.initialValue, value.options);
  });
};
