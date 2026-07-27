const User = require('../models/user')
const bcryptjs=require('bcryptjs')
const {generateToken}=require('../middleware/auth');
const user = require('../models/user');
const addUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({ message: 'Success' })
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'Internal Server Error'
        })
    }
}

//with token and using email to sign in
const getUserByEmailAndPassword = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        const isMatch=await bcryptjs.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:'Incorrect password'})
        }
        const token=generateToken(user.toObject());
        if(!token){
            return res.status(401).json({message:'Unauthorized user'})
        }
        res.status(200).json({message:'User logged in successfully',user,token})
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'Internal Server Error'
        })
    }
}

//without token working for both inc1 ,3
// const getUserByEmailAndPassword = async (req, res) => {
//     try {
//         const { username, password } = req.body
//         const user = await User.findOne({ username, password })
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' })
//         }
//         res.status(200).json({message:'User logged in successfully',user})
//     } catch (error) {
//         res.status(error.status || 500).json({
//             message: error.message || 'Internal Server Error'
//         })
//     }
// }

const getAllUsers=async(req,res)=>{
    try {
        const users=await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'Internal Server Error'
        })
    }
}

const forgotPassword=async(req,res)=>{
    try {
        const {email,confirm_password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        user.password=confirm_password;
        user.confirm_password=confirm_password
        await user.save();
        // await User.findByIdAndUpdate(user._id,{password:confirm_password,confirm_password:confirm_password},{new:true});
        res.status(200).json({message:'Password updated successfully'})
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'Internal Server Error'
        })
    }
}
const verifyEmail=async(req,res)=>{
    try {
        const {email}=req.body;
        const user=await user.findOne({email});
        if(user){
            return res.status(200).json({exists:true});
        }
        return res.status(404).json({exists:false});
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'Internal Server Error'
        })
    }
}

module.exports={addUser,getUserByEmailAndPassword,getAllUsers,forgotPassword,verifyEmail}