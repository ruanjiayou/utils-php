module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('rccode', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    agencyId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    agencyName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comments: '中介名称'
    },
    agencyAvatar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comments: '用户(合作者)名称'
    },
    userAvatar: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    userPhone: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    rccode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comments: '推荐码'
    },
    type: {
      type: DataTypes.ENUM('pending', 'buyer', 'servant'),
      allowNull: false,
      defaultValue: 'pending',
      comments: '合作类型'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      comments: '创建日期'
    }
  }, {
      freezeTableName: false,
      underscoredAll: true,
      tableName: 'rccode',
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