import express from "express"
import dotenv from "dotenv/config"
import connectDB from "./db/connectDB.js"
import router from "./routes/web.js"
import cors from "cors"

const app = express()

const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

//for cors policy
app.use(cors())

//for json data request and responses
app.use(express.json())

//implementing routes
app.use("/user", router)

//for getting images from server
app.use("/uploads", express.static("./uploads"));

//for exporting users csv
app.use("/files", express.static("./public/files"))

//connecting database
connectDB(DATABASE_URL)

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})
