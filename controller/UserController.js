import userModel from "../models/userSchema.js"
import moment from "moment";
class UserController {

    static homepage = (req,res) => {
        res.send("Home Page")
    }
    static registerUser = async (req,res) => {
        const file = req.file.filename
        const {fname, lname, email, mobile, gender, location, status} = req.body
        
        if(!fname || !lname || !email || !mobile || !gender || !location || !status){
            res.status(401).json({"status": "failed", "messages": "All fields are required"})
        }
        try {
            const user =await userModel.findOne({email: email})
            if(user){
                res.status(401).json({"status": "failed", "messages": "User Already Exists"})
            }else{

            const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
            const newUser = new userModel({
                fname, lname, email, mobile, gender, location, status, profile: file, datecreated
            })
            await newUser.save()
            res.status(200).json({"status":"Success", "message": "User Register Successful"})
            }
        } catch (error) {
            res.status(401).json({"status": "failed", "message": "Error is Registratinf user"})
        }
            
    }
    static gettingAllUser = async (req, res) => {
        try {
           const result = await userModel.find()
           console.log(result)
           res.status(200).json({"status": "success", "message": "got all data"})
        } catch (error) {
            res.status(401).json({"status": "failed", "message": "errro in getting all users data"})
        }
    }
   
}

export default UserController