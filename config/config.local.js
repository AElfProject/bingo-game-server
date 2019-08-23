module.exports = appInfo => {
  exports = {};
  const config = exports;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_development';

  // add your config here
  config.middleware = [];

  // change to your own sequelize configurations
  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'aelf_bingo',
    username: 'root',
    password: 'password',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: false
    }
  };

  config.security = {
    csrf: {
      enable: process.env.NODE_ENV === 'production'
    }
  };

  // 初始token
  config.initialAmount = 100000;

  config.cacheKey = {
    topRecords: {
      name: 'top_records',
      initialValue: [],
      options: {
        expireTimeout: 5000
      }
    }
  };
  return config;
};
