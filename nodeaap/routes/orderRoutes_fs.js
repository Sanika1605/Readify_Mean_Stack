const {getAllOrders,addOrder,getOrderById,getOrderByUserId,updateOrder,deleteOrder}=require('../controllers/orderController_fs');

const router=require('express').Router()

router.post('/addOrder',addOrder)
router.get('/getAllOrders',getAllOrders)
router.get('/getOrderById/:id',getOrderById)
router.get('/getOrderByUserId/:userId',getOrderByUserId)
router.delete('/deleteOrder/:id',deleteOrder)
router.put('/updateOrder/:id',updateOrder)

module.exports=router