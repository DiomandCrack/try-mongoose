const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017/recruit';

const models = {
    user:{
        'user':{type:String,require:true},
        'email':{type:String,require:true},
        'pwd':{type:String,require:true},
        'type':{type:String,require:true},
        'avatar':{type:String,require:true},
        //resume
        'desc':{type:String},
        //offer
        'title':{type:String},
        //boss
        'company':{type:String},
        'payroll':{type:String},
    },
    message:{
        'chat_id':{type:String,require:true},
        'from':{type:String,require:true},
        'to':{type:String,require:true},
        'content':{type:String,require:true,default:''},
        'create_time':{type:Number,default:new Date().getTime()},
        'read':{type:Boolean,default:false}
    }
}

for(let model in models){
    mongoose.model(model,new mongoose.Schema(
        models[model]
    ))
}

class Database {
    connect() {
        mongoose.connect(DB_URL)
        mongoose.connection.on('connected', () => {
            console.log('mongoDB connect successfully');
        })
    }
    getModel(modelName){
        return mongoose.model(modelName)
    }
}

module.exports = Database;