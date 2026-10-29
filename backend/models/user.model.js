const mongoose = module.require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema=new Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3, 'First name at least be 3 characters long'],

        },


         lastname:{
            type:String,
            required:true,
            minlength:[3, 'last name at least be 3 characters long'],
         },


      
    },


    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5, 'last name at least be 3 characters long']
    },

    password:{
        type:String,
        required:true,

    },

       socketId:{
            type:String,
         }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id:this._id},process.env.JWT_SECRET)
    return token;
}

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password,10);
}

const userModel = mongoose.model('user', userSchema);

module.exports=userModel;