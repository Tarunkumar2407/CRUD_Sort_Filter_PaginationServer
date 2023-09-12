import express from "express"
import upload from "../multerConfig/storageConfig.js"
import UserController from "../controller/UserController.js"
// import userRegister from "../controller/UserController.js"
const router = express.Router()

router.get('/',UserController.homepage)
router.post("/register",upload.single("user_profile"),UserController.registerUser)
router.get("/getallusers",UserController.gettingAllUser)

export default router