module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('sms', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    logicId: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      comments: '模板id或签名id'
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      comments: '签名或模板内容'
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comments: '资质图片base64'
    },
    type: {
      type: DataTypes.ENUM('sign', 'tpl'),
      allowNull: false,
      defaultValue: 'tpl',
      comments: '签名: sign 模板类型: tpl'
    },
    status: {
      type: DataTypes.ENUM('pending', 'using', 'fail', 'success'),
      allowNull: false,
      defaultValue: 'pending',
      comments: '短信模板状态'
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '',
      comments: '失败原因'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '无描述',
      comments: '模板用途描述'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      comments: '创建日期'
    }
  }, {
      freezeTableName: false,
      underscoredAll: true,
      tableName: 'sms',
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