module.exports = {
  // 在执行数据库升级时调用的函数，创建 results 表
  up: async (queryInterface, Sequelize) => {
    const {
      STRING,
      INTEGER,
      DATE,
      NOW
    } = Sequelize;
    await queryInterface.createTable('results', {
      address: {
        type: STRING(255),
        allowNull: false,
        comment: 'user wallet address'
      },
      result: {
        type: INTEGER,
        allowNull: false,
        comment: 'bingo play result'
      },
      time: {
        type: DATE,
        defaultValue: NOW,
        comment: 'play time'
      },
      count: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: 'primary key'
      }
    });
    await queryInterface.addIndex('results', {
      unique: false,
      fields: [
        {
          attribute: 'address',
          order: 'DESC'
        }
      ],
      name: 'address'
    });
  },
  // 在执行数据库降级时调用的函数，删除 results 表
  down: async queryInterface => {
    await queryInterface.dropTable('results');
  },
};
