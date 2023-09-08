import express from "express"
import upload from "../multerConfig/storageConfig.js"
import UserController from "../controller/UserController.js"
const router = express.Router()

router.post("/register",upload.single("user_profile"),UserController.registerUser)

export default UserController