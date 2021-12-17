const { Schema, model, Types } = require('mongoose')


const schema = new Schema({
    title:{type:String},
    description:{type:String},
    htmlColor:[{type:String}],
    photos:[{type:String}],
    value:{type:Number},
    color:{type:String},
    complection:{type:String},
    compatibility:{type:String},
    material:{type:String},
    test:{type:String}
})



module.exports = model('embalismentProduct', schema) 