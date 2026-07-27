//ms3
require('dotenv').config();
const express=require('express')
const mongoose=require('mongoose')
const userRouter=require('./routes/userRoutes')
const bookRouter=require('./routes/bookRoutes')
const orderRouter=require('./routes/orderRoutes_fs')
const reviewRouter=require('./routes/reviewRoutes')
const cors=require('cors');
const app=express()
const port = process.env.PORT || 8080;

const allowedOrigins = [
    'http://localhost:4200',
    'http://127.0.0.1:8081',
    'https://8081-feddebdbccbcfb336329890ceadbdbefone.premiumproject.examly.io'
];
// const allowedOrigins = [
//     'http://localhost:8081',
//     'http://127.0.0.1:8081',
//     'https://8081-feddebdbccbcfb336329890ceadbdbefone.premiumproject.examly.io'
// ];

app.use(cors({
    origin: allowedOrigins,
    methods:['GET','POST','PUT','DELETE','PATCH'],
    allowedHeaders:['content-type','authorization']
}))

// allowedHeaders:['content-type','authorization','Content-Type'],
// credentials:true
app.use(express.json());

app.use('/users',userRouter)
app.use('/books',bookRouter)
app.use('/order',orderRouter)
app.use('/review',reviewRouter)


const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/readify';
mongoose.set('strictQuery', true); 
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('db connected')
    app.listen(port,()=>console.log(`listen on port ${port}`))
}).catch((error)=>{
    console.log(error.message)
})

//ms-1
// const express=require('express')
// const mongoose=require('mongoose')
// const userRouter=require('./routes/userRoutes')
// const bookRouter=require('./routes/bookRoutes')
// const orderRouter=require('./routes/orderRoutes')
// const cors=require('cors');
// const app=express()

// app.use(cors({
//     origin:'https://8081-feddebdbccbcfb333274457cadeaffbabaddbcaone.premiumproject.examly.io',
//     methods:['GET','POST','PUT','DELETE','PATCH'],
//     // allowedHeaders:['content-type','authorization'],
//     // exposedHeaders:['content-type'],
// }))
// // allowedHeaders:['content-type','authorization','Content-Type'],
// // credentials:true
// app.use(express.json());

// app.use('/users',userRouter)
// app.use('/books',bookRouter)
// app.use('/order',orderRouter)

// mongoose.connect('mongodb://127.0.0.1:27017/readify',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// })
// .then(()=>{
//     console.log('db connected')
//     app.listen(8080,()=>console.log('listen'))
// }).catch((error)=>{
//     console.log(error.message)
// })





