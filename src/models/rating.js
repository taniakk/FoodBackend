import mongoose from "mongoose";
const { Schema } = mongoose;

const ratingSchema = new Schema(
    {
        foodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "food",
            required: true

        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min:1,
            max:5
        },
        review: {
            type: String,

        },
},{timestamps: true});

const Rating = mongoose.model("Rating", ratingSchema);
export default Rating;