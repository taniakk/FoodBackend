import express from 'express';


import { addPayment, readPayment } from '../controller/payment.controller.js';

const paymentRouter = express.Router()

paymentRouter.post('/addPayment/:Orderid',addPayment)
paymentRouter.get('/readPayment',readPayment)

export default paymentRouter