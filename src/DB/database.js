import mongoose from "mongoose";
const connectDB = async() =>{
    try {
        const connectionDB = await mongoose.connect(`${process.env.MONGO_DB}`)

        const response = connectionDB.connection.host
        
        console.log(`MONGODB RUN ON ${response}`)
        
    } catch (error) {
        console.log(error)
        
    }
}
export default connectDB