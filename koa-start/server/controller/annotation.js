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

      let rdoc = doc.map(async(v,i,a)=>{
        let user = await UserController.dbFindUser({_id:v.uid})
        console.log("*",JSON.stringify(user,null,'  '))
        return {
          ...v.toObject(),
          username:user.username
        }
      })
      Promise.all(rdoc)
        .then((rdoc)=>{
          console.log("**",JSON.stringify(rdoc,null,'  '))
          resolve(rdoc)
        }).catch(reject)
    });
  });
};
// const findAllAnnotationPro = async () => {
//   let doc =findAllAnnotation
//   return doc
// };


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
  let body = ctx.request.body
  let state = ctx.state
  let jwt = state.jwt
  let data = body.data
  // console.log(JSON.stringify(ctx,null,'  '))
  // console.log('*',JSON.stringify(jwt,null,'  '))
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
  let doc = await findAllAnnotation();
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
