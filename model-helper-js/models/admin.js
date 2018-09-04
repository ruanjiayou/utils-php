module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('admin', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      comments: '手机号'
    },
    nickName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      comments: '昵称'
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      comments: '头像'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comments: '密码'
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comments: '密码'
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comments: '时间戳'
    },
    isSA: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comments: '是否是超级管理员'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW,
      comments: '创建日期'
    }
  }, {
      freezeTableName: false,
      underscoredAll: true,
      tableName: 'admin',
      charset: 'utf8mb4',
      initialAutoIncrement: 1,
      timezone: '+08:00',
      paranoid: false,
      timestamps: false,
      indexes: []
    });
  model.seed = async () => {
    const data = [
      { phone: '18972376480', nickName: 'admin', password: '$2y$10$1234567890abcdefghiljewspSf/damwE4gk/rKIGvoctupw7Nd7O', salt: '1234567890abcdefghiljlmn', isSA: 1, createdAt: new Date() }
    ];
    await model.bulkCreate(data);
  }
  return model;
}