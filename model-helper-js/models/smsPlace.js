module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('SmsPlace', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      signId: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      sign: {
        type: DataTypes.STRING,
        defaultValue: ''
      },
      tplId: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      tpl: {
        type: DataTypes.STRING,
        defaultValue: ''
      },
      isSms: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      place: {
        type: DataTypes.ENUM('forgot','modify','zhuche','system','invite','cancel','refused','accepted','canceled'),
        allowNull: false,
        comments: '占位信息: system是系统公告'
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '无描述',
        comments: '模板用途描述'
      }
    }, {
        freezeTableName: false,
        underscoredAll: true,
        tableName: 'sms_place',
        charset: 'utf8mb4',
        initialAutoIncrement: 1,
        timezone: '+08:00',
        paranoid: false,
        timestamps: false,
        indexes: []
      });
    model.seed = async () => {
      const data = [
          { place: 'forgot', description: '忘记密码验证码'},
          { place: 'modify', description: '修改密码验证码'},
          { place: 'zhuche', description: '注册账号验证码'},
          { place: 'system', description: '系统消息短信模板'},
          { place: 'invite', description: '买家邀请妹子短信模板'},
          { place: 'cancel', description: '买家取消邀请短信模板'},
          { place: 'refused', description: '卖家拒绝邀请模板'},
          { place: 'accepted', description: '卖家接受邀请模板'},
          { place: 'canceled', description: '卖家取消邀请模板'},
      ];
      await model.bulkCreate(data);
    }
    return model;
  }