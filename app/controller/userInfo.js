/**
 * @file user info
 * @author atom-yang
 */
const Controller = require('../core/baseController');

class UserInfoController extends Controller {
  async register() {
    const { ctx } = this;
    const rule = {
      address: {
        type: 'string'
      },
      name: {
        type: 'string'
      },
      phone: {
        type: 'string'
      }
    };
    try {
      this.validate(rule);
      const {
        address,
        name,
        phone
      } = ctx.request.body;
      const [ result, isNew ] = await ctx.model.Users.addUser({
        address,
        name,
        phone
      });
      if (!isNew) {
        this.error({
          message: 'You have registered this account by this phone',
          code: 300,
          errors: []
        });
      }
      this.sendBody({
        count: result.count
      });
    } catch (e) {
      e.code = e.code ? e.code : 400;
      this.error(e);
      this.sendBody();
    }
  }
}

module.exports = UserInfoController;
