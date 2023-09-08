import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
   try {
    await mongoose.connect(DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    return console.log("Connection Successfull")
   } catch (error) {
    console.log("Error in connecting to database", error)
   }
}

export default connectDB