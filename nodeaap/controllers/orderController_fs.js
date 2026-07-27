// const Order = require('../models/order');
// const orderItem = require('../models/orderItem');
// const Cart = require('../models/orderItem')
// const User = require('../models/user')

// const addOrder = async (req, res) => {
//     try {
//         const order = await Order.create(req.body);
//         return res.status(201).json(order);
//     } catch (error) {
//         return res.status(500).json({ message: error.message })
//     }
// }
// const getAllOrders = async (req, res) => {
//     try {
//         const orders = await Order.find({}).populate('orderItems');
//         return res.status(200).json(orders);
//     }
//     catch (error) { res.status(500).json({ message: error.message }) }
// }
// const getOrderById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const order = await Order.findById(id).populate('orderItems');
//         if (!order) {
//             res.status(404).json({ message: "Not found" })
//         } return res.status(200).json(order);
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// }
// const getOrderByUserId = async (req, res) => {
//     try {
//         const { userId } = req.query;
//         const order = await Order.find({ user: userId }).populate('orderItems');
//         if (!order) {
//             res.status(404).json({ message: "No orders found for this user" })
//         } return res.status(200).json(order);
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// }   
// const updateOrder = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const order = await Order.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
//         if (!order) {
//             res.status(404).json({ message: "Not found" })
//         } return res.status(200).json(order);
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// } 
// const deleteOrder = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const order = await Order.findByIdAndDelete(id);
//         if (!order) {
//             res.status(404).json({ message: `Cannot find any order with ${id}` })
//         } res.status(200).json({ message: "Order Deleted Successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// } 
// const checkout = async (req, res) => {
//     try {
//         const { username, shippingAddress, billingAddress } = req.body;
//         const user = await User.findOne({ username });
//         if (!user) {
//             res.status(404).json({ message: `User not found` })
//         } console.log(user._id)
//         const cartItems = await Cart.find({ user: user._id, order: null }).populate('book');
//         if (cartItems.length === 0) {
//             return res.status(400).json({ message: `Cart is empty` })
//         }
//         const totalAmount = cartItems.reduce((sum, item) => sum + item.totalAmount, 0)
//         const order = await Order.create({
//             user: user._id,
//             shippingAddress,
//             billingAddress,
//             totalAmount,
//             orderItems: cartItems.map(item => item._id),
//             orderStatus: "Placed"
//         })
//         await Promise.all(cartItems.map(item => {
//             item.order = order._id;
//             return item.save();
//         }))
//         const populatedOrder = await Order.findById(order._id).populate({
//             path: 'orderItems',
//             populate: { path: 'book', model: 'Books' }
//         })         
//         return res.status(201).json(populatedOrder);
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// } 
// module.exports = { addOrder, getAllOrders, getOrderById, getOrderByUserId, updateOrder, deleteOrder, checkout }


const Order=require('../models/order');
const Book = require('../models/book');
const OrderItem = require('../models/orderItem');

const addOrder=async(req,res)=>{
    try {
        const {user,shippingAddress,billingAddress,orderItems}=req.body;
        if(orderItems.length==0){
            return res.status(400).json({
                message:'No ordersItems found.'
            })
        }
        const order={
            user,
            shippingAddress,
            billingAddress,
            orderItems:[],
            totalAmount:0,
            orderStatus:'Pending'
        }
        console.log(orderItems)
        const ordered=await new Order(order).save()

        for(const item of orderItems){
            const book=await Book.findById(item.book)
            if(!book){
                return res.status(404).json({message:'Book not found'})
            }
            if(book.stockQuantity>=item.quantity){
                book.stockQuantity-=item.quantity
                await book.save();
            }else{
                return res.status(400).json({message:'Book out of stock'})
            }
           const  orderItem=await OrderItem.create({book:item.book,quantity:item.quantity,price:book.price})//book or item.price
           ordered.totalAmount+=item.quantity*book.price;
            (ordered.orderItems).push({orderItem:orderItem._id})
            await ordered.save()
        }
        res.status(201).json({message:'Order Placed Successfully',ordered})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getAllOrders=async(_req,res)=>{
    try {
        const orders=await Order.find().populate({
            path:'orderItems.orderItem',
            populate:{path:'book'}
        }).populate('user')
        // .populate({
        //     path:'user',
        //     model:'User'
        // })
        // .populate({
        //     path:'orderItems',
        //     model:'orderItem',
        //     populate:{
        //         path:'book',
        //         model:'Book'
        //     }
        // })
        const count=await Order.countDocuments();
        res.status(200).json({orders,count})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getOrderById=async(req,res)=>{
    try {
        const {id}=req.params;
        const order=await Order.findById(id).populate({
            path:'orderItems.orderItem',
            populate:{path:'book'}
        }).populate('user')
        if(!order){
            res.status(404).json({message:`Order not found`})
        }
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getOrderByUserId=async(req,res)=>{
    try {
        const {userId}=req.params;
        const order=await Order.find({user:userId}).populate('user').populate('orderItems.orderItem').populate({
            path:'orderItems.orderItem',
            populate:{path:'book'}
        })
        if(!order){
            res.status(404).json({message:`Order not found`})
        }
        res.status(200).json({order})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const updateOrder=async(req,res)=>{
    try {
        const {id}=req.params;
        const order=await Order.findByIdAndUpdate(id,req.body,{new:true})
        if(!order){
            res.status(404).json({message:`Cannot find any order with ID ${id}`})
        }
        res.status(200).json({message:'Order Updated Successfully',order})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const deleteOrder=async(req,res)=>{
    try {
        const {id}=req.params;
        const order=await Order.findByIdAndDelete(id)
        if(!order){
            res.status(404).json({message:`Cannot find any order with ID ${id}`})
        }
        res.status(200).json({
            message:'Order Deleted Successfully'
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


module.exports={getAllOrders,addOrder,getOrderById,getOrderByUserId,updateOrder,deleteOrder}