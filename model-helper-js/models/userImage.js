module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('userImage', {
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
    url: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      comments: '图片地址'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      comments: '创建日期'
    }
  }, {
      freezeTableName: false,
      underscoredAll: true,
      tableName: 'user_image',
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