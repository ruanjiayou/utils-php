module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('price', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.BIGINT,
        defaultValue: 0
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comments: '金额数值'
      },
      type: {
        type: DataTypes.ENUM('order', 'signin', 'rebate'),
        allowNull: false,
        defaultValue: 'order',
        comments: '类型'
      }
    }, {
        freezeTableName: false,
        underscoredAll: true,
        tableName: 'price',
        charset: 'utf8mb4',
        initialAutoIncrement: 1,
        timezone: '+08:00',
        paranoid: false,
        timestamps: false,
        indexes: []
      });
    model.seed = async () => {
      const data = [
        { value: 10, type: 'signin'},
        { value: 70, type: 'rebate'}
      ];
      await model.bulkCreate(data);
    }
    return model;
  }