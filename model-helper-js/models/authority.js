module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('authority', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comments: '权限名称'
    },
  }, {
      freezeTableName: false,
      underscoredAll: true,
      tableName: 'authority',
      charset: 'utf8mb4',
      initialAutoIncrement: 1,
      timezone: '+08:00',
      paranoid: false,
      timestamps: false,
      indexes: []
    });
  model.seed = async () => {
    const data = [
      { name: '人员管理' },
      { name: '订单管理' },
      { name: '提现管理' },
      { name: '审核管理' },
      { name: '消息管理' },
      { name: '运营管理' },
      { name: '权限管理' },
      { name: '退款管理' }
    ];
    await model.bulkCreate(data);
  }
  return model;
}