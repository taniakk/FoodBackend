import express from 'express'

// import { foodCreate, foodRead } from '../controller/food.controller.js'
import { addOrder, cancelOrderStatus, getOrderById, handleInsertMAny, orderRead, orderReadAll, updateOrderStatus  } from '../controller/order.controller.js'
import { checkAuth } from '../middleware/checkToken.js'

const orderRouter = express.Router()

// orderRouter.post('/addOrder',checkAuth,addOrder)
orderRouter.post('/addOrder',checkAuth,addOrder)
orderRouter.get('/getOrders',orderReadAll)
orderRouter.get('/getOrder',checkAuth,orderRead)
orderRouter.get('/getOrderByID/:id',getOrderById)
orderRouter.put('/updateOrder/:id',checkAuth,updateOrderStatus)
orderRouter.put('/cancelOrder/:id',checkAuth,cancelOrderStatus)


orderRouter.post("/order", handleInsertMAny);
  

export default orderRouter