import dotenv from "dotenv"
dotenv.config()
import connectDB from "./DB/database.js"
import express from "express"
import userRouter from "./Routes/user.routes.js"
import foodRouter from "./Routes/food.routes.js"
import categoryRouter from "./Routes/category.routes.js"
import subCategoryRouter from "./Routes/subCategory.routes.js"
import orderRouter from "./Routes/order.routes.js"
import paymentRouter from "./Routes/payment.routes.js"
import cartRouter from "./Routes/cart.routes.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
import compression from 'compression'
import RatingRouter from "./Routes/rating.routes.js"
const app = express()
const port = process.env.port

//use compression midleware
app.use(compression({
    level:9, //max compression level
}));

// built in middleware
// CORS configuration
const corsOptions = {
    origin: '*', // Replace with your frontend's origin
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'], // Add allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Add required headers
  };
  
  app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json())

app.use(express.urlencoded({extended:true}))
app.use('/uploads',express.static('uploads'))

app.use('/',userRouter)
app.use('/',foodRouter)
app.use('/',categoryRouter)
app.use('/',subCategoryRouter)
app.use('/',orderRouter)
app.use('/',paymentRouter)
app.use('/',cartRouter)
app.use('/',RatingRouter)
connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`SERVER RUN ON http://localhost:${port}`)
        })
})
.catch((err)=>{
    console.log(err)
})
