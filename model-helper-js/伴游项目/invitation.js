module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('invitation', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    buyerId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    buyerName: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    buyerAvatar: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    buyerPhone: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    sellerId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    sellerName: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    sellerAvatar: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    sellerPhone: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comments: '价格'
    },
    status: {
      type: DataTypes.ENUM('pending', 'success', 'fail'),
      allowNull: false,
      defaultValue: 'pending'
    },
    progress: {
      type: DataTypes.ENUM('inviting', 'refused', 'canceling', 'canceled', 'accepted', 'confirmed', 'expired', 'refund', 'refunding', 'refunded'),
      allowNull: false,
      defaultValue: 'inviting',
      comments: '邀请状态'
    },
    isComment: {
      type: DataTypes.ENUM('not', 'sold', 'expired', 'bought', 'yes'),
      allowNull: false,
      defaultValue: 'not',
      comments: 'not: 未评论, sold: 卖家已评论 bought: 买家已评论 yes: 已评论 expired: 过期'
    },
    commentOfbuyer: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    commentOfseller: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    scoreOfbuyer: {
      type: DataTypes.INTEGER,
      defaultValue: 5
    },
    scoreOfseller: {
      type: DataTypes.INTEGER,
      defaultValue: 5
    },
    isComplaint: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    complaint: {
      type: DataTypes.STRING,
      defaultValue: '投诉'
    },
    isRefund: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comments: '可判断投诉订单是否已处理'
    },
    refund: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    x: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false,
      defaultValue: 0,
      comments: '经度'
    },
    y: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false,
      defaultValue: 0,
      comments: '纬度'
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      comments: '邀请地址'
    },
    startAt: {
      type: DataTypes.DATE,
      allowNull: false,
      comments: '创建日期'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      comments: '创建日期'
    }
  }, {
      freezeTableName: false,
      underscoredAll: true,
      tableName: 'invitation',
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