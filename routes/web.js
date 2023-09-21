import express from "express"
import upload from "../multerConfig/storageConfig.js"
import UserController from "../controller/UserController.js"
// import userRegister from "../controller/UserController.js"
const router = express.Router()

router.get('/',UserController.homepage)
router.post("/register",upload.single("user_profile"),UserController.registerUser)
router.get("/getallusers",UserController.gettingAllUser)
router.get("/getuser/:id", UserController.getUserById)
router.put("/edit/:id",upload.single("user_profile"), UserController.updateById)
router.delete("/delete/:id",UserController.deleteUser)
router.put("/status/:id",UserController.updateStatus)
router.put("/status/:id",UserController.updateStatus)
router.get('/usersexport', UserController.exportUser)
export default router