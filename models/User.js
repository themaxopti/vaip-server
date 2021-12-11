const {Schema,model,Types} = require('mongoose')


const schema = new Schema({
    name:{type:String,required:true},
    surname:{type:String},
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    father:{type:String},
    phone:{type:String},
    orders:[{type:Types.ObjectId,ref:'Order'}],
    totalCount:{type:Number}
})

module.exports = model('User',schema) 