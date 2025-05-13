import express from 'express'

import { addCart, getCart, handleDecerement, handleIncrement, handleRemove, readCart } from '../controller/cart.controller.js'
import { checkAuth } from '../middleware/checkToken.js'

const cartRouter = express.Router()

cartRouter.post('/addCart',checkAuth,addCart)
cartRouter.get('/readCart', readCart)
cartRouter.get('/getUserCart',checkAuth,getCart)


cartRouter.patch("/increment/:id",handleIncrement);

cartRouter.patch("/decrement/:id",handleDecerement )
  
cartRouter.delete("/remove/:id", handleRemove);
  

export default cartRouter