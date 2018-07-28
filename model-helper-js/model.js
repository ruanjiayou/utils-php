const fs = require('fs');
const path = require('path');
const mysqlCfg = require('./config');
const loader = require('./loader');
const Sequelize = require('sequelize');

const models = {};

// 数据库连接实例
const DB = new Sequelize(mysqlCfg.database, mysqlCfg.username, mysqlCfg.password, {
  dialect: mysqlCfg.dialect,
  host: mysqlCfg.host,
  port: mysqlCfg.port,
  define: {
    // 默认驼峰命名 false 下划线蛇形 true
    underscored: false
  },
  // logging 为 false 则不显示
  //logging: logger,
  timezone: mysqlCfg.timezone,
  dialectOptions: {
    requestTimeout: 15000
  }
});

// 处理单个文件
const handler = (info) => {
  if (__filename !== info.fullpath) {
    let fn = require(info.fullpath);
    let model = fn(DB, Sequelize);
    model.getAttributes = function () {
      return Object.keys(this.attributes);
    }
    models[model.name] = model;
  }
}

// 遍历文件
loader(handler, {
  dir: __dirname + '/models',
  recusive: false
});

// 挂载变量
models.sequelize = DB;
models.Op = DB.Op;

module.exports = models;