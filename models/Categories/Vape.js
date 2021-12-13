const { Schema, model, Types } = require('mongoose')


const schema = new Schema({
    category:{type:String,default:'Vape'},
    title:{type:String,required:true},
    value:{type:Number,required:true},
    description:{type:String},
    photos:[{type:String,default:''}],
    type:{type:String},
    typeOfAutomizer:{type:String},
    valueOfNikotin:{type:String},
    valueOfAccamulator:{type:String},
    color:{type:String},
    htmlColor:[{type:String}],
    weight:{type:String}
})



module.exports = model('Vape', schema) 