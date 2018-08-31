module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('catalog', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      comments: '分类名称'
    },
    type: {
      type: DataTypes.ENUM('buyer','seller','user'),
      defaultValue: 'user',
      comments: 'buyer: 买家评论标签, seller: 卖家评论标签, user: 用户资料标签'
    }
  }, {
      freezeTableName: false,
      underscoredAll: true,
      tableName: 'catalog',
      charset: 'utf8mb4',
      initialAutoIncrement: 1,
      timezone: '+08:00',
      paranoid: false,
      timestamps: false,
      indexes: []
    });
  model.seed = async () => {
    const data = [
      { name: '爱好', type: 'user'},
      { name: '特长', type: 'user'},
      { name: '差', type: 'seller'},
      { name: '一般', type: 'seller'},
      { name: '满意', type: 'seller'},
      { name: '差', type: 'buyer'},
      { name: '一般', type: 'buyer'},
      { name: '满意', type: 'buyer'}
    ];
    await model.bulkCreate(data);
  }
  return model;
}