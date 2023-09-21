import userModel from "../models/userSchema.js";
import moment from "moment";
import csv from "fast-csv";
import fs from "fs";
class UserController {
  static homepage = (req, res) => {
    res.send("Home Page");
  };
  static registerUser = async (req, res) => {
    const file = req.file.filename;
    const { fname, lname, email, mobile, gender, location, status } = req.body;

    if (
      !fname ||
      !lname ||
      !email ||
      !mobile ||
      !gender ||
      !location ||
      !status
    ) {
      res
        .status(401)
        .json({ status: "failed", messages: "All fields are required" });
    }
    try {
      const user = await userModel.findOne({ email: email });
      if (user) {
        res
          .status(401)
          .json({ status: "failed", messages: "User Already Exists" });
      } else {
        const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
        const newUser = new userModel({
          fname,
          lname,
          email,
          mobile,
          gender,
          location,
          status,
          profile: file,
          datecreated,
        });
        await newUser.save();
        res.status(200).json(newUser);
      }
    } catch (error) {
      res
        .status(401)
        .json({ status: "failed", message: "Error is Registratinf user" });
    }
  };
  static gettingAllUser = async (req, res) => {
    const search = req.query.search || "";
    const gender = req.query.gender || "";
    const status = req.query.status || "";
    const sort = req.query.sort || "";
    const query = {
      fname: { $regex: search, $options: "i" },
    };
    console.log(req.query);
    if (gender !== "All") {
      query.gender = gender;
    }

    if (status !== "All") {
      query.status = status;
    }
    try {
      const result = await userModel
        .find(query)
        .sort({ datecreated: sort == "new" ? -1 : 1 });
      //    console.log(result)
      res.status(200).json(result);
    } catch (error) {
      res
        .status(401)
        .json({ status: "failed", message: "error in getting all users data" });
    }
  };
  static getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findOne({ _id: id });
      res.status(200).json(user);
      console.log(user);
    } catch (error) {
      res
        .status(401)
        .json({
          status: "failed",
          message: "error in getting user data by id",
        });
    }
  };

  static updateById = async (req, res) => {
    const { id } = req.params;
    const {
      fname,
      lname,
      email,
      mobile,
      gender,
      location,
      status,
      user_profile,
    } = req.body;
    const file = req.file ? req.file.filename : user_profile;
    const dateUpdated = moment(new Date()).format("DD-MM-YYYY hh:mm:ss");
    try {
      const updateUser = await userModel.findByIdAndUpdate(
        { _id: id },
        {
          fname,
          lname,
          email,
          mobile,
          gender,
          status,
          location,
          profile: file,
          dateUpdated,
        },
        { new: true }
      );
      await updateUser.save();
      res.status(200).json(updateUser);
    } catch (error) {
      res
        .status(401)
        .json({ status: "failed", message: "Error is updating user" });
    }
  };
  static deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const userDelete = await userModel.findByIdAndDelete({ _id: id });
      res.status(200).json(userDelete);
    } catch (error) {
      res
        .status(401)
        .json({ status: "failed", message: "Error in deleting user" });
    }
  };

  static updateStatus = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    try {
        const userStatus = await findByIdAndUpdate(
            { _id: id },
            { status: data },
            { new: true }
            );
            res.status(200).json(userStatus);
            console.log(req.body)
            console.log(userStatus)
        } catch (error) {
            // res.send(error)
            res
            .status(401)
            .json({ status: "failed", message: "Error in updating user Status" });
        }
    };
    
  static exportUser = async (req, res) => {
    const usersData = await userModel.find();
    try {
        const csvStream = csv.format({ headers: true });
        if (!fs.existsSync("public/files/export")) {
          if (!fs.existsSync("public/files")) {
            fs.mkdirSync("public/files");
          }
        }
        if (!fs.existsSync("public/files/export")) {
          fs.mkdirSync("./public/files/export");
        }
        const writeableStream = fs.createWriteStream("public/files/export/users.csv")
        csvStream.pipe(writeableStream)
    
        writeableStream.on("finish",function(){
            res.json({
                downloadUrl: `http://localhost:8000/files/export/users.csv`
            })
        })

        if(usersData.length > 0) {
            usersData.map((user)=> {
                csvStream.write({
                    FirstName: user.fname ? user.fname : "-",
                    LirstName: user.lname ? user.fname : "-",
                    Email: user.email ? user.email : "-",
                    Phone: user.mobile ? user.mobile : "-",
                    Gender: user.gender ? user.gender : "-",
                    Status: user.status ? user.status : "-",
                    Profile: user.profile ? user.profile : "-",
                    Location: user.location ? user.location : "-",
                    DateCreated: user.datecreated ? user.datecreated : "-",
                    DateUpdated: user.dateupdated ? user.dateupdated : "-"
                })
            })
        }
        csvStream.end();
        WritableStream.end();

    } catch (error) {
        res.send(error)
        // res.status(401).json({"status": "failed", "message": "Error in Exporting to csv"})
    }
  };
}

export default UserController;
