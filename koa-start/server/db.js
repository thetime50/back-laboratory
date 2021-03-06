const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/vue-login');
// const domain  = process.argv[2] //|| 'localhost'
// const domain  = 'localhost'
const domain  = 'thetime-mongodb'
const dbUrl = `mongodb://${domain}/vue-login`
try{
    console.log('connect db to ',dbUrl)
    mongoose.connect(dbUrl);
}catch(e){
    console.log('error and exit, open mongodb')
    process.exit()
}

let db = mongoose.connection;
// 防止Mongoose: mpromise 错误
mongoose.Promise = global.Promise;

db.on('error', function(){
    console.log('数据库连接出错！');
});
db.on('open', function(){
    console.log('数据库连接成功！');
});

//声明schema
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    // recheck: String,
    token: String,
    create_time: Date
});
const annotationSchema = mongoose.Schema({
    uid: String,
    annotation: Object,
    create_time: Date
});
//根据schema生成model
const model = {
    User: mongoose.model('User', userSchema),
    Annotation: mongoose.model('Annotation', annotationSchema),
};

module.exports = model;
