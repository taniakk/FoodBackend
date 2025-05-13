import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      
    },
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "food",
      
    },
    quantity: {
      type: Number,
      
    },
    price: {
      type: Number, // Use `Number` for consistency and easier calculations
     
    },
    totalPrice: {
      type: Number, // Computed field: price * quantity
      
    },
  },
  { timestamps: true }
);

const cart = mongoose.model("cart", cartSchema);
export default cart;
