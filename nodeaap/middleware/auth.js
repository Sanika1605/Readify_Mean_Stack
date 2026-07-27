const jwt=require('jsonwebtoken')

const generateToken=(user)=>{
    console.log(user)
    return jwt.sign(user,
        "#secret123",{expiresIn:'1d'});
}

const validateToken=(req,res,next)=>{
    const authToken=req.headers.authorization;
    if(!authToken || ! authToken.startsWith('Bearer')){
        return res.status(401).json({message:'Unauthorised user'})
    }
    const token=authToken.substring(7);
    try {
        jwt.verify(token,'#secret123');
        next()
    } catch (error) {
        return res.status(401).json({message:'Unauthorized user'})
    }
}
module.exports={generateToken,validateToken}