/**
 * @file user_info model
 * @author atom-yang
 */

module.exports = app => {
  const {
    STRING,
    INTEGER
  } = app.Sequelize;

  const Users = app.model.define('users', {
    name: {
      type: STRING(255),
      allowNull: false,
      comment: 'user name'
    },
    address: {
      type: STRING(255),
      allowNull: false,
      unique: true,
      comment: 'user wallet address'
    },
    count: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: 'primary key and user registry number'
    }
  }, {
    indexes: [
      {
        unique: true,
        method: 'BTREE',
        fields: [ 'address' ],
        name: 'address'
      }
    ]
  });
  Users.addUser = async function(userInfo = {}) {
    const result = await this.findCreateFind({
      where: {
        address: userInfo.address
      },
      defaults: {
        ...userInfo
      }
    });
    return result;
  };
  return Users;
};
