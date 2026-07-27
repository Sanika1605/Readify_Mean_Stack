const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    reviewText:{
        type:String,
        required:true,
        trim:true
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    date:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book',
        required:true 
    }

})

module.exports=mongoose.model('Review',schema)