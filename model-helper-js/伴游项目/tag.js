module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('tag', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    cataId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comments: '分类id'
    },
    cataName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comments: '分类名称'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      comments: '标签名'
    },
    type: {
      type: DataTypes.ENUM('buyer','seller','user'),
      defaultValue: 'user'
    }
  }, {
      freezeTableName: false,
      underscoredAll: true,
      tableName: 'tag',
      charset: 'utf8mb4',
      initialAutoIncrement: 1,
      timezone: '+08:00',
      paranoid: false,
      timestamps: false,
      indexes: []
    });
  model.seed = async () => {
    const data = [
      { type: 'user', cataId:1, cataName: '爱好', name: 'LOL'},
      { type: 'user', cataId:2, cataName: '特长', name: '脚特长'},
      { type: 'seller', cataId:3, cataName: '差', name: '不好'},
      { type: 'seller', cataId:4, cataName: '一般', name: '一般般'},
      { type: 'seller', cataId:5, cataName: '满意', name: '非常满意'},
      { type: 'buyer', cataId:6, cataName: '差', name: '不好'},
      { type: 'buyer', cataId:7, cataName: '一般', name: '还行'},
      { type: 'buyer', cataId:8, cataName: '满意', name: '我很满意'},
    ];
    await model.bulkCreate(data);
  }
  return model;
}