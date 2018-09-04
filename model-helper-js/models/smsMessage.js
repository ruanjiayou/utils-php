module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('SmsMessage', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        comments: '模板'
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        comments: '手机号'
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'code',
        comments: '与place表的place字段一致'
      },
      status: {
        type: DataTypes.ENUM('pending', 'fail', 'success'),
        allowNull: false,
        defaultValue: 'pending',
        comments: '短信发送状态'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        comments: '创建日期'
      }
    }, {
        freezeTableName: false,
        underscoredAll: true,
        tableName: 'sms_message',
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