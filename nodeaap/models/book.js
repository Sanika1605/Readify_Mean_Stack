const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: String,
        // required: true,
        enum:['Available','Out of Stock']
    },
    category: {
        type: String,
        required: true,
    },
    stockQuantity: {
        type: Number,
        // required: true,
        min: 0
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: String,
        // required: true
    }
},{timestamps:true})

module.exports=mongoose.model('Book',bookSchema);



    
        // enum: ['Fiction', 'Non-fiction', 'Science', 'Comics', 'Romance', 'Triller', 'Fantasy', 'Children']