const Annotation = require('../db.js').Annotation;
//下面这两个包用来生成时间
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');

const UserController = require('./user.js');


const findAnnotation = (para) => {
  return new Promise((resolve, reject) => {
    Annotation.findOne(para, (err, doc) => {
      if (err) {
        reject(err);
      }
      resolve(doc);
    });
  });
};
//找到所有标注
const findAllAnnotation = () => {
  return new Promise((resolve, reject) => {
    Annotation.find({}, (err, doc) => {
      if (err) {
        reject(err);
      }
      resolve(doc);
    });
  });
};
const findAllAnnotationPro = async () => {
  let doc = await findAllAnnotation()

  let rdoc = doc.map(async(v,i,a)=>{
    let user = await UserController.dbFindUser({_id:v.uid})
    return {
      ...v.toObject(),
      username:user.username
    }
  })
  rdoc = await Promise.all(rdoc)
  return rdoc
};
//删除某个用户
const delAnnotation = function(id) {
  return new Promise((resolve, reject) => {
    Annotation.findOneAndRemove({ _id: id }, err => {
      if (err) {
        reject(err);
      }
      console.log('删除注释成功');
      resolve();
    });
  });
};

/////////////////////////////////////////////////////////////////////////
//添加
const Create = async(ctx) => {
  let body = ctx.request.body
  let state = ctx.state
  let jwt = state.jwt
  // let data = body.data
  // console.log(JSON.stringify(ctx,null,'  '))
  // console.log(JSON.stringify(jwt,null,'  '))
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
  let body = ctx.request.body
  let state = ctx.state
  let jwt = state.jwt
  let data = body.data
  // console.log(JSON.stringify(ctx,null,'  '))
  // console.log(JSON.stringify(jwt,null,'  '))
  // console.log(JSON.stringify(body,null,'  '))
  
  let doc = await findAnnotation({_id:data._id})
  doc.annotation = data.annotation

  await new Promise((resolve, reject) => {
    doc.save((err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
  console.log("annotation update ok")
  ctx.status = 200;
  ctx.body = {
    success: true
  }
};
//查询
const Retrive = async(ctx) => {
  let doc = await findAllAnnotationPro();
  console.log("annotation retrive ok")
  ctx.status = 200;
  ctx.body = {
    success: true,
    data: doc,
  }
};

//删除
const Delete = async(ctx) => {
  //拿到要删除的用户id
  // let id = ctx.request.body.id;
  // await delUser(id);
  let body = ctx.request.body
  let state = ctx.state
  let jwt = state.jwt
  let _id = body._id
  // console.log(JSON.stringify(ctx,null,'  '))
  // console.log(JSON.stringify(jwt,null,'  '))
  // console.log(JSON.stringify(body,null,'  '))
  await delAnnotation(_id)
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
