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
    const result = await this.findAll({
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
    return result;
  };

  Results.getSingleCount = async function(address) {
    const result = await this.findAll({
      attributes: [[ fn('COUNT', col('address')), 'total' ]],
      where: {
        address
      }
    });
    return result;
  };

  Results.getTopRecords = async function(limit = 20) {
    const result = await this.findAll({
      attributes: [ 'address', [ fn('SUM', col('result')), 'total' ], [ fn('COUNT', col('result')), 'times' ]],
      group: 'address',
      order: [
        [ fn('SUM', col('result')), 'DESC' ]
      ]
    });
    return result.map(v => {
      const result = v.dataValues;
      result.total = parseInt(result.total, 10) + initialAmount;
      return result;
    }).filter(v => v.times >= 3).slice(0, limit);
  };

  return Results;
};
