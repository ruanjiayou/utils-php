module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('userBill', {
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
    type: {
      type: DataTypes.ENUM('income', 'expent'),
      allowNull: false,
      defaultValue: 'income',
      comments: '收入或支出'
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comments: '金钱数额'
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      comments: '来源去向详情'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      comments: '创建日期'
    }
  }, {
      freezeTableName: false,
      underscoredAll: true,
      tableName: 'user_bill',
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