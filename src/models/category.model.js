import mongoose from "mongoose"
const{Schema}=mongoose

const categorySchema = new Schema({
    Category:{
        type : String,
        required : true,
        enum:["Appetizers","Main Course","Side Dishes", "Beverages", "Desserts", "Fast Food"],
        default:"Appetizers"
    }
},{timestamps:true})

const category = mongoose.model("category",categorySchema)

export default category