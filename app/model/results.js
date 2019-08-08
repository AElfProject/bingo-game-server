/**
 * @file results model
 * @author atom-yang
 */

module.exports = app => {
  const {
    STRING,
    INTEGER,
    DATE,
    NOW,
    fn,
    col,
    IndexHints
  } = app.Sequelize;
  const { initialAmount } = app.config;

  // todo: 添加索引
  const Results = app.model.define('results', {
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
  }, {
    indexes: [
      {
        unique: false,
        fields: [
          {
            attribute: 'address',
            order: 'DESC'
          }
        ],
        name: 'address'
      }
    ]
  });

  Results.getSingleUserResult = async function(address, offset = 0) {
    await this.findAll({
      attributes: [ 'address', 'result', 'time' ],
      indexHints: [
        { type: IndexHints.USE, values: [ 'address' ] }
      ],
      where: {
        address
      },
      offset,
      order: [
        [ 'count', 'DESC' ]
      ]
    });
  };

  Results.getSingleCount = async function(address) {
    await this.findAll({
      attributes: [[ fn('COUNT', col('address')), 'total' ]],
      where: {
        address
      }
    });
  };

  Results.getTopRecords = async function(limit = 20) {
    const result = await this.findAll({
      attributes: [ 'address', [ fn('SUM', col('result')), 'total' ]],
      group: 'address',
      order: [
        [ fn('SUM', col('result')), 'DESC' ]
      ],
      limit
    });
    return result.map(v => {
      v.total += initialAmount;
      return v;
    });
  };

  return Results;
};
