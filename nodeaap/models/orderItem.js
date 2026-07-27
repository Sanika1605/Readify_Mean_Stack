const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    quantity:{
        type:Number,
        required:true,
        min:1
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book',
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('OrderItem',schema)