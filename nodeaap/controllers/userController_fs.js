const {writeDataToFileUsingFileSystem,readDataAndPrintUsingFileSystem}=require('../Week4day5')

const register_fs=(req,res)=>{
    const userData=readDataAndPrintUsingFileSystem();
    const exists=userData.filter(ele=>ele.email==req.body.email)
    if(exists.length){
        return res.status(400).json({
            message:'User already registered, Please Login!',
            error:error.meesage
        })
    }
    const user={
        id:userData.length?user[user.length-1].id+1 :1, ...req.body
    };
    userData.push(user)
    writeDataToFileUsingFileSystem(userData)
    return res.status(200).json({error:false, message:'User registered successfuly'})
}

const login_fs=(req,res)=>{
    const userData=readDataAndPrintUsingFileSystem()
    const exists=userData.filter(ele=>ele.email==req.body.email)
    if(exists.length){
        if(userData.filter(ele=>ele.password==req.body.password)){
            return res.status(200).json({
                error:false,
                message:'Login Successfully',
                email:req.body.email
            })
        }
        return res.status(500).json({
            error:true,
            message:'Wrong Password'
        })
    }
    return res.status(404).json({
        error:true,
        message:'Email not found'
    })
}
const getAllUsers_fs=(req,res)=>{
    const userData=readDataAndPrintUsingFileSystem()
    return res.status(200).json(userData)
}
const resetPassword_fs=(req,res)=>{
    const userData=readDataAndPrintUsingFileSystem()
    const user=userData.filter(ele=>ele.email==req.body.email)
    if(user.length){
        if(userData.filter(ele=>ele.password==req.body.password)){
            return res.status(500).json({message:'Old password cannot be same as old password'})
        }
        user.password=req.body.password;
        const index=userData.filter(ele=>ele.id==user.id)
        userData[index]=user;
        writeDataToFileUsingFileSystem(userData)
        return res.status(200).json({message:'User password has been updated successfully'})
    }
    return res.status(400).json({
        error:true,
        message:'User not found.'
    })
}

module.exports={register_fs,login_fs,getAllUsers_fs,resetPassword_fs}