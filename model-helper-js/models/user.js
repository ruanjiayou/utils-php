module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('user', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      comments: '手机号'
    },
    identity: {
      type: DataTypes.STRING,
      allowNull: true,
      comments: '身份证'
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true,
      comments: '推荐码'
    },
    trueName: {
      type: DataTypes.STRING,
      allowNull: true,
      comments: '真实姓名'
    },
    nickName: {
      type: DataTypes.STRING,
      allowNull: true,
      comments: '昵称'
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      comments: '头像'
    },
    introduce: {
      type: DataTypes.STRING,
      allowNull: true,
      comments: '简介'
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true,
      comments: '标签'
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 160,
      comments: '身高'
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 160,
      comments: '体重'
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
      comments: '评分'
    },
    x: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: false,
      defaultValue: 0,
      comments: '经度'
    },
    y: {
      type: DataTypes.DECIMAL(10,4),
      allowNull: false,
      defaultValue: 0,
      comments: '纬度'
    },
    images: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comments: '图片数量'
    },
    popular: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comments: '人气点击数'
    },
    money: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comments: '钱币玫瑰'
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      comments: '籍贯'
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
      comments: '所在城市'
    },
    type: {
      type: DataTypes.ENUM('buyer', 'servant', 'agency'),
      allowNull: false,
      defaultValue: 'buyer',
      comments: '真实姓名'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      comments: '入驻日期'
    }
  }, {
    freezeTableName: false,
    underscoredAll: true,
    tableName: 'user',
    charset: 'utf8mb4',
    initialAutoIncrement: 1,
    timezone: '+08:00',
    paranoid: false,
    timestamps: false,
    indexes: []
  });
  model.seed = async() => {
    const data = [];
    await model.bulkCreate(data);
  }
  return model;
}