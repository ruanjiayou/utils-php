module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('adminAuthority', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    adminId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comments: '管理员id'
    },
    authorityId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comments: '权限id'
    },
    authorityName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comments: '权限名称'
    }
  }, {
      freezeTableName: false,
      underscoredAll: true,
      tableName: 'admin_auth',
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