import express from "express"
import dotenv from "dotenv/config"
import connectDB from "./db/connectDB.js"
const app = express()

const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

connectDB(DATABASE_URL)
app.get('/', (req,res) => {
    res.send("Home")
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})
