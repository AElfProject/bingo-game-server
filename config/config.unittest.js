
// change to your own sequelize configurations for test
exports.sequelize = {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  database: 'aelf_bingo',
  username: 'root',
  password: '',
  define: {
    timestamps: false
  }
};
