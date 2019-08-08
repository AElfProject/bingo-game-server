/**
 * @file router
 * @author atom-yang
 */

module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.post('/bingo/register', controller.userInfo.register);
  router.post('/bingo/recordResult', controller.records.addRecord);
  router.get('/bingo/topRecords', controller.records.topRecords);
  router.get('/bingo/personalRecords', controller.records.personalRecords);
  router.get('/bingo/initCsrfToken', controller.initCsrfToken.initToken);
};
