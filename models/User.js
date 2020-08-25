const mongoose = require('mongoose')
const Schema = mongoose.Schema

const string = {type:String,required: true}

const UserSchema = new Schema({
    name:string,
    surname:string,
    nickname: {
        type:String,
        required:true,
        minLength:6,
        unique:true,
    },
    password:{
        type:String ,
        minlength:5,
        required:true,
        password:true,
    },
})

module.exports = mongoose.model('user',UserSchema);