/**
 * @file user_info model
 * @author atom-yang
 */

module.exports = app => {
  const {
    STRING,
    INTEGER,
    Op
  } = app.Sequelize;

  const Users = app.model.define('users', {
    name: {
      type: STRING(255),
      allowNull: false,
      comment: 'user name'
    },
    phone: {
      type: STRING(255),
      allowNull: false,
      unique: true,
      comment: 'user phone'
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
      },
      {
        unique: true,
        method: 'BTREE',
        fields: [ 'phone' ],
        name: 'phone'
      }
    ]
  });
  Users.addUser = async function(userInfo = {}) {
    await this.findCreateFind({
      where: {
        [Op.or]: [
          {
            address: userInfo.address
          },
          {
            phone: userInfo.phone
          }
        ]
      },
      defaults: {
        ...userInfo
      }
    });
  };
  return Users;
};
