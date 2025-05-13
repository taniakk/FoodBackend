import mongoose from "mongoose"

const {Schema} = mongoose

const foodSchema = new Schema({
    subCategoryId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'subCategory'
    },
    foodName:{
        type : String,
        require : true
    },
    foodIngredients:{
        type : String,
        require : true
    },
    price:{
        type : String,
        require : true
    },
    image:{
        type : String
    }
},{timestamps:true})

const food = mongoose.model("food",foodSchema)

export default food