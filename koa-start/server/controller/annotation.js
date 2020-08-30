const Annotation = require('../db.js').Annotation;
//下面这两个包用来生成时间
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');

//添加
const Create = async(ctx) => {
  let body = ctx.request.body
  let state = ctx.state
  let jwt = state.jwt
  // let data = body.data
  // console.log(JSON.stringify(ctx,null,'  '))
  // console.log('*',JSON.stringify(jwt,null,'  '))
  // console.log(JSON.stringify(body,null,'  '))
  
  let annotation = new Annotation({
    uid:jwt.uid,
    annotation:body.data || null,//annotation
  });
  annotation.create_time = moment(objectIdToTimestamp(annotation._id)).format('YYYY-MM-DD HH:mm:ss');

  await new Promise((resolve, reject) => {
    annotation.save((err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
  console.log("annotation create ok")
  ctx.status = 200;
  ctx.body = {
    success: true,
    data: annotation,
  }
}

//修改
const Update = async(ctx) => {
  console.log('修改');
  ctx.status = 200;
  ctx.body = {
    success: true
  }
};
//查询
const Retrive = async(ctx) => {
  console.log('查询');
  ctx.status = 200;
  ctx.body = {
    success: true
  }
};

//删除
const Delete = async(ctx) => {
  //拿到要删除的用户id
  // let id = ctx.request.body.id;
  // await delUser(id);
  ctx.status = 200;
  ctx.body = {
    success: '删除成功'
  };
};

module.exports = {
  Create,
  Update,
  Retrive,
  Delete,
};
