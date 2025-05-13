import food from "../models/food.model.js";
import order from "../models/order.model.js";
import user from "../models/user.model.js";
import cart from "../models/cart.model.js";
import mongoose from "mongoose";

export async function addOrder(req, res) {
  const { cartItems, address, pinCode } = req.body;
  const { id: userId } = req.user;

  try {
    console.log("Received data:", { cartItems, address, pinCode, userId });
    
    // Validate input
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).send("Cart is empty or invalid.");
    }
    
    if (!address || !pinCode) {
      return res.status(400).send("Address and pin code are required.");
    }

    // Validate each cart item has required fields
    const invalidItems = cartItems.filter(item => !item.foodId || !item.quantity || !item.price);
    if (invalidItems.length > 0) {
      console.error("Invalid cart items:", invalidItems);
      return res.status(400).send("Some cart items are missing required fields (foodId, quantity, price).");
    }

    const userExists = await user.findById(userId);
    if (!userExists) {
      return res.status(404).send("User not found.");
    }

    const orderData = {
      userId,
      items: cartItems.map(item => ({
        foodId: item.foodId,
        quantity: Number(item.quantity),
        price: Number(item.price),
      })),
      totalAmount: cartItems.reduce((sum, item) => {
        return sum + (Number(item.price) * Number(item.quantity));
      }, 0),
      address,
      pinCode,
    };
    
    const savedOrder = await order.create(orderData);
    await cart.deleteMany({ userId });
    
    res.status(201).send({ message: "Order created successfully", order: savedOrder });
    

    // res.status(201).send({ message: "Orders created successfully", orders: savedOrders });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).send(`Error creating order: ${error.message}`);
  }
}
export async function orderRead(req, res) {
  const {id} = req.user
  // console.log("You are here")
  try {
    const orders = await order
  .find({userId:id})
  .populate([
    { path: "items.foodId", select: "foodName" }, // correct nested path
    { path: "userId", select: "name email" },      // changed nameOfPerson to userId
  ]);

      
      // console.log(orders)

    if (orders.length === 0) {
      return res.status(404).send("No orders found");
    }

    res.status(200).send({ message: "Orders fetched successfully", orders });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}


export async function orderReadAll(req, res) {
  
  try {
    const orders = await order
  .find()
  .populate([
    { path: "items.foodId", select: "foodName" }, // correct nested path
    { path: "userId", select: "name email" },      // changed nameOfPerson to userId
  ]);

      
      // console.log(orders)

    if (orders.length === 0) {
      return res.status(404).send("No orders found");
    }

    res.status(200).send({ message: "Orders fetched successfully", orders });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

export async function logUserOrder(req, res) {
  const { id } = req.user;

  try {
    const userOrders = await order
      .find({ nameOfPerson: id })
      .populate([
        { path: "foodId", select: "foodName" },
        { path: "nameOfPerson", select: "name email" },
      ])
      .exec();

    if (!userOrders || userOrders.length === 0) {
      return res.status(404).send("No orders found for this user");
    }

    res.status(200).send({ message: "User orders fetched successfully", orders: userOrders });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

export async function handleInsertMAny(req,res) {
  const { cartItems } = req.body;
  try {
    const orders = await order.insertMany(cartItems.map(item => ({
      foodId: item.foodId,
      quantity: item.quantity,
      totalPrice: item.price * item.quantity,
    })));
    await cart.deleteMany(); // Clear the cart
    res.status(201).send(orders);
  } catch (error) {
    res.status(500).send("Server error.");
  }
}

export async function getOrderById(req,res) {
  const {id} = req.params
  try {
    const data = await order.findOne({_id:id}).select("totalAmount")

  return  res.status(200).send(data)
    
  } catch (error) {
    console.log(error)
    res.status(500).send("SERVER ERROR ")
  }
}

export async function updateOrderStatus(req, res) {
  console.log("Inside updateOrderStatus controller");
  const { id } = req.params;
  const { status } = req.body;
  console.log(req.body,req.params)
  console.log("You are here")

  // Only allow specific statuses
  const allowedStatuses = ["Pending", "Paid", "Shipped", "Delivered", "Cancelled"];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const updatedOrder = await order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).select("status");

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      status: updatedOrder.status,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Server error while updating status" });
  }
}


export async function cancelOrderStatus(req, res) {
  console.log("Inside updateOrderStatus controller");

  const { id } = req.params;
  const { status } = req.body; // The status to be updated

  console.log("Status Update Request:", req.body, req.params);

  // Ensure the status is 'Cancelled' for a cancel action
  if (status !== "Cancelled") {
    return res.status(400).json({ error: "Invalid status value for cancellation" });
  }

  try {
    // Check if the order exists and the current status is 'Pending' before allowing cancellation
    const updatedOrder = await order.findByIdAndUpdate(
      id,
      { status: "Cancelled" }, // Update status to 'Cancelled'
      { new: true }
    ).select("status");

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Respond with success
    res.status(200).json({
      message: "Order status updated successfully to Cancelled",
      status: updatedOrder.status,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Server error while updating status" });
  }
}
