//inc3
// const {getUserByEmailAndPassword,addUser,getAllUsers,forgotPassword}=require('../controllers/userController');
// const auth=require('../middleware/auth')
// const router=require('express').Router()

// router.post('/login',getUserByEmailAndPassword)
// router.post('/register',addUser)
// router.get('/',auth,getAllUsers)
// router.put('/forgot-password',forgotPassword)

// module.exports=router

//inc 3 without auth --working
const {getUserByEmailAndPassword,addUser,getAllUsers,forgotPassword,verifyEmail}=require('../controllers/userController');

const router=require('express').Router()

router.post('/login',getUserByEmailAndPassword)
router.post('/register',addUser)
router.post('/verify-email',verifyEmail)
router.get('/',getAllUsers)
// router.put('/forgot-password/:id',forgotPassword)//inc1
router.put('/forgot-password',forgotPassword)

module.exports=router

//inc1
// const {getUserByEmailAndPassword,addUser,getAllUsers,forgotPassword}=require('../controllers/userController');

// const router=require('express').Router()

// router.post('/login',getUserByEmailAndPassword)
// router.post('/register',addUser)
// router.get('/',getAllUsers)
// router.put('/forgot-password/:id',forgotPassword)//inc1

// module.exports=router