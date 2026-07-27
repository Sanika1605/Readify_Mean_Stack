const mongoose=require('mongoose')
const bcryptjs=require('bcryptjs')
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validation:{
            validator:(v)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            message:(props)=>`${props.value} invalid email format`,
            immutable:true
        }   
    },
    mobileNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    new_password:{
        type:String,
    },
    confirm_password:{
        type:String,
    },
    userRole:{
        type:String,
        required:true
    }
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next;
    }
    const salt=await bcryptjs.genSalt(10)
    this.password=await bcryptjs.hash(this.password,salt)
    next()
})


module.exports=mongoose.model('User',userSchema);