import payment from "../models/payment.model.js";
import order from "../models/order.model.js";

export async function addPayment(req, res) {
  const { payment_type, amount, cart_type, cvc_code,card_number } = req.body;
  const {Orderid} = req.params

  try {
   

    // Validate amount
    // const parsedAmount = parseFloat(amount);
    // console.log(parsedAmount)
    // if (isNaN(parsedAmount) || parsedAmount <= 0) {
    //   return res.status(400).send("Amount must be a positive number");
    // }

    const parsedcard_number = parseFloat(card_number);
    console.log(parsedcard_number)
    if (parsedcard_number) {
      if (isNaN(parsedcard_number) || parsedcard_number <= 0) {
        return res.status(400).send("Card Number must be a  number");
      }
    }
 
    // Check if order exists
    const orderCheck = await order.findById(Orderid);
    if (!orderCheck) {
      return res.status(404).send("Order ID does not exist");
    }

    // Create payment
    const paymentCheck = new payment({
      orderId: orderCheck._id,
      paymentType:payment_type,
      card_number:parsedcard_number,
      amount,
      cart_type: payment_type === 'Online' ? cart_type : undefined,
      cvc_code: payment_type === 'Online' ? cvc_code : undefined,
      paymentStatus:"Success"
    });

    await paymentCheck.save();

    // Optionally update order status
    orderCheck.status = "Paid";
    await orderCheck.save();

    res.status(201).send({ message: "Payment added successfully", payment: paymentCheck });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}


  export async function readPayment(req, res) {
    try {
      const payments = await payment.find().populate("orderId", "NameOFOrder totalAmount");
  
      if (!payments || payments.length === 0) {
        return res.status(404).send("No payments found");
      }
  
      res.status(200).send({ message: "Payments retrieved successfully", payments });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
  