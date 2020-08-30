const User = require('../db.js').Annotation;
//下面这两个包用来生成时间
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');
//用于密码加密
const sha1 = require('sha1');
//createToken
const createToken = require('../token/createToken.js');

//数据库的操作
//根据用户名查找用户
const findUser = (username) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username }, (err, doc) => {
      if (err) {
        reject(err);
      }
      resolve(doc);
    });
  });
};
//找到所有用户
const findAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({}, (err, doc) => {
      if (err) {
        reject(err);
      }
      resolve(doc);
    });
  });
};
//删除某个用户
const delUser = function(id) {
  return new Promise((resolve, reject) => {
    User.findOneAndRemove({ _id: id }, err => {
      if (err) {
        reject(err);
      }
      console.log('删除用户成功');
      resolve();
    });
  });
};

//添加/修改
const Update = async(ctx) => {
  let user = new User({
    username: ctx.request.body.name,
    password: sha1(ctx.request.body.pass), //加密
    token: createToken(this.username) //创建token并存入数据库
  });

  //将objectid转换为用户创建时间(可以不用)
  user.create_time = moment(objectIdToTimestamp(user._id)).format('YYYY-MM-DD HH:mm:ss');
  let doc = await findUser(user.username);
  if (doc) {
    console.log('用户名已经存在');
    ctx.status = 200;
    ctx.body = {
      success: false
    };
  } else {
    await new Promise((resolve, reject) => {
      user.save((err) => {
        if (err) {
          reject(err);
        }

        resolve();

      });
    });
    console.log('注册成功');
    ctx.status = 200;
    ctx.body = {
      success: true
    }
  }
};
//查询
const Retrive = async(ctx) => {
  //查询所有用户信息
  let doc = await findAllUsers();
  ctx.status = 200;
  ctx.body = {
    succsess: '成功',
    result: doc
  };
};

//删除
const Delete = async(ctx) => {
  //拿到要删除的用户id
  let id = ctx.request.body.id;
  await delUser(id);
  ctx.status = 200;
  ctx.body = {
    success: '删除成功'
  };
};

module.exports = {
  // Create,
  Update,
  Retrive,
  Delete,
};
