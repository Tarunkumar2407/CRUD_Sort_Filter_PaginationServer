import express from "express"
import userModel from "../models/userSchema"
import upload from "../multerConfig/storageConfig"
import UserController from "../controller/UserController"
const router = express.Router()

router.post("/register",upload.single("user_profile"),UserController.registerUser)

export default UserController