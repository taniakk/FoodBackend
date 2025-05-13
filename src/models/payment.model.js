import mongoose from "mongoose";
const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true,
    },
    paymentType: {
      type: String,
      enum: ['Online', 'COD'],
      required: true,
    },
    cardNumber: {
      type: String,
      default: undefined,
    },
    amount: {
      type: Number,
      required: true,
    },
    cardType: {
      type: String,
      default: undefined,
    },
    cvcCode: {
      type: String,
      default: undefined,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
