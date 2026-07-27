const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    orderDate: {
        type: Date,
        default: Date.now
    },
    orderStatus: {
        type: String,
        required: true,
        // enum:['Pending','Processing','Shipped','Delivered','Cancelled']
    },
    shippingAddress: {
        type: String,
        required: true
    },
    billingAddress: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [{
        orderItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OrderItem',
            required: true
        }
    }]

}, { timestamps: true })

module.exports = mongoose.model('Order', schema)