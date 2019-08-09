module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const {
      STRING,
      INTEGER
    } = Sequelize;
    await queryInterface.createTable('users', {
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
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
