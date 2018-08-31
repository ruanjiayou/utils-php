module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('order', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      order_no: {
        type: DataTypes.STRING,
        defaultValue: ''
      },
      trade_no: {
        type: DataTypes.STRING,
        defaultValue: ''
      },
      reason: {
        type: DataTypes.TEXT,
        defaultValue: ''
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comments: '价格'
      },
      type: {
        type: DataTypes.ENUM('recharge', 'withdraw'),
        allowNull: false,
        defaultValue: 'recharge'
      },
      status: {
        type: DataTypes.ENUM('pending', 'success', 'fail'),
        allowNull: false,
        defaultValue: 'pending'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        comments: '创建日期'
      }
    }, {
        freezeTableName: false,
        underscoredAll: true,
        tableName: 'order',
        charset: 'utf8mb4',
        initialAutoIncrement: 1,
        timezone: '+08:00',
        paranoid: false,
        timestamps: false,
        indexes: []
      });
    model.seed = async () => {
      const data = [];
      await model.bulkCreate(data);
    }
    return model;
  }