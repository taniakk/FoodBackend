import mongoose from "mongoose"
import category from "./category.model.js"
const {Schema} = mongoose

const subCategorySchema = new Schema({
    categoryId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "category"
    },
    Subcategory_name:{
        type : String,
        enum: ["Soups","Salads","Finger Foods","Vegetarian Dishes", "Non-Vegetarian Dishes", "Rice and Pasta", "Curries and Gravies", "Breads", "Fries and Chips","Hot Beverages", "Cold Beverages", "Smoothies and Shakes", "Alcoholic Drinks", "Cake and Pastries", "Ice-Cream and Frozen Desserts", "Indian Sweets", "Burgers and Sandwiches", "Pizza and Pasta", "Tacos and Wraps"],
        default :"Indian"
    }
},{timestamps:true})

const subCategory = mongoose.model("subCategory",subCategorySchema)

export default subCategory