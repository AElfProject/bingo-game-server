/**
 * @file records update and query
 * @author atom-yang
 */
const moment = require('moment');
const Controller = require('../core/baseController');

class RecordsController extends Controller {
  async addRecord() {
    const { ctx } = this;
    const rule = {
      address: {
        type: 'string'
      },
      result: {
        type: 'number'
      }
    };
    try {
      this.validate(rule);
      const { address, result } = ctx.request.body;
      const currentTime = moment().format();
      const insertResult = await ctx.model.Results.create({
        address,
        result,
        time: currentTime
      });
      console.log(insertResult.dataValues.count);
      this.sendBody({});
    } catch (e) {
      e.code = e.code ? e.code : 400;
      this.error(e);
      this.sendBody();
    }
  }

  async topRecords() {
    const { ctx, app } = this;
    const {
      cacheKey
    } = app.config;
    try {
      let list = app.cache.getCache(cacheKey.topRecords.name);
      if (!Array.isArray(list)) {
        console.log('get from database');
        list = await ctx.model.Results.getTopRecords();
        app.cache.setCache(cacheKey.topRecords.name, list);
      }
      this.sendBody({
        list
      });
    } catch (e) {
      e.code = e.code ? e.code : 400;
      this.error(e);
      this.sendBody();
    }
  }

  async personalRecords() {
    const { ctx } = this;
    const {
      address,
      pageNum = 1,
      pageSize = 20
    } = ctx.request.query;
    try {
      const result = await ctx.model.Results.getSingleUserResult(
        address,
        (pageNum - 1) * pageSize
      ) || [];
      const count = await ctx.model.Results.getSingleCount(address);
      const total = count && count.length > 0 ? count[0].dataValues.total : 0;
      this.sendBody({
        total,
        list: result.map(v => ({
          ...v.dataValues,
          time: moment(v.dataValues.time).format('YYYY-MM-DD HH:mm:ss')
        }))
      });
    } catch (e) {
      e.code = e.code ? e.code : 400;
      this.error(e);
      this.sendBody();
    }
  }
}

module.exports = RecordsController;
