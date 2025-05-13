import cart from "../models/cart.model.js";
import user from "../models/user.model.js";
import food from "../models/food.model.js";

export async function addCart(req, res) {
  let { foodId, quantity } = req.body; // Declare quantity with let to allow reassignment
  const { id } = req.user;

  try {
    quantity = parseInt(quantity); // Parse quantity as an integer

    const check = await food.findOne({ _id: foodId });
    if (!check) {
      return res.status(400).send("FoodId doesn't exist");
    }

    const userCheck = await user.findOne({ _id: id });
    if (!userCheck) {
      return res.status(400).send("User doesn't exist");
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).send("Quantity must be a positive integer");
    }

    const checkQuantity = await cart.findOne({ userId: id, foodId: foodId });

    if (checkQuantity) {
      checkQuantity.quantity += quantity; // Increment quantity
      checkQuantity.totalPrice = checkQuantity.quantity * check.price; // Update total price
      await checkQuantity.save();
      return res.status(200).send("Cart updated successfully");
    }

    const cartOption = new cart({
      userId: userCheck._id,
      foodId: check._id,
      quantity,
      price: check.price,
      totalPrice: quantity * check.price, // Calculate total price
    });
    await cartOption.save();
    res.status(201).send(cartOption);
  } catch (error) {
    console.log(error);
    res.status(500).send("SERVER ERROR");
  }
}



export async function readCart(req, res) {
  try {
    const check = await cart.find().populate([
      { path: "foodId", select: "foodName price" },
      { path: "userId", select: "name email" },
    ]);
    if (check.length === 0) {
      return res.status(200).send("Cart is empty");
    }
    res.status(200).send(check);
  } catch (error) {
    console.log(error);
    res.status(500).send("SERVER ERROR");
  }
}


export async function getCart(req, res) {
  const { id } = req.user;

  try {
    const fetchData = await cart.find({ userId: id }).populate("foodId");
    if (fetchData.length === 0) {
      return res.status(200).send("Your cart is empty");
    }

    const response = fetchData.map(item => ({
      _id : item._id,
      foodId : item.foodId._id,
      foodName: item.foodId.foodName,
      image: item.foodId.image,
      foodIngredients: item.foodId.foodIngredients,

      quantity: item.quantity,
      price: item.price,
      totalPrice: item.totalPrice,
    }));

    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("SERVER ERROR");
  }
}


export async function handleIncrement(req, res) {
  const { id } = req.params;
  console.log(id)
  try {
    const cartItem = await cart.findById(id);
    if (!cartItem) return res.status(404).send("Cart item not found.");
    cartItem.quantity += 1;
    await cartItem.save();
    const updatedCart = await cart.find(); // Fetch updated cart
    console.log(updatedCart)
    res.status(200).send(updatedCart);
  } catch (error) {
    console.log(error)
    return  res.status(500).send("Server error.");
  }
}

export async function handleDecerement(req, res) {
  const { id } = req.params;
  try {
    const cartItem = await cart.findById(id);
    if (!cartItem) return res.status(404).send("Cart item not found.");
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      await cartItem.save();
    } else {
      await cart.findByIdAndDelete(id); // Remove item if quantity reaches zero
    }
    const updatedCart = await cart.find();
    res.status(200).send(updatedCart);
  } catch (error) {
    res.status(500).send("Server error.");
  }
}

export async function handleRemove(req, res) {
  const { id } = req.params;
  try {
    await cart.findByIdAndDelete(id);
    const updatedCart = await cart.find();
    res.status(200).send(updatedCart);
  } catch (error) {
    res.status(500).send("Server error.");
  }
}