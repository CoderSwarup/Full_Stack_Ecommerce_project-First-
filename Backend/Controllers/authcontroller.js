import userModel from "../Models/user.model.js";
import { comparePassword, hashPassword } from "../helper/authhelper.js";

//import json webtoken
import JWT from "jsonwebtoken";

const RegisterController = async (req, res) => {
  try {
    const { username, email, password, phone, answer, address } = req.body;

    //validation
    if (!username) return res.send({ message: "Username is Required" });
    if (!email) return res.send({ message: "email is Required" });
    if (!password) return res.send({ message: "password is Required" });
    if (!phone) return res.send({ message: "phone Number is Required" });
    if (!answer) return res.send({ message: "Answer is Required" });
    if (!address) return res.send({ message: "Address is Required" });

    //check existing user
    const existinguser = await userModel.findOne({ email });

    if (existinguser) {
      return res.status(200).send({
        success: true,
        message: "Email is Already Registered Use Another Email",
      });
    }

    //Register USER
    //hashed the password
    const haspasswd = await hashPassword(password);

    //save the user

    const newuser = await new userModel({
      username,
      email,
      password: haspasswd,
      phone,
      answer,
      address,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Is Registered successfully",
      newuser,
    });

    //allis done
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register",
      error,
    });
  }
};

//LOgin controller

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Validation

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email OR Password",
      });
    }

    //check the user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User is Not Registerd",
      });
    }

    //compare password
    const Matchpasswd = await comparePassword(password, user.password);

    if (!Matchpasswd) {
      return res.status(200).send({
        success: false,
        message: "Invalid Email OR Password ",
      });
    }

    //JWT TOken

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRETE, {
      expiresIn: "14d",
    });

    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

//update prodile

export const updateProfileController = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    // console.log();
    if (phone.length < 10) {
      return res.send({
        success: false,
        message: "Mobile number is Not Completed",
      });
    }
    const user = await userModel.findById(req.user._id);

    const updateuser = await userModel
      .findByIdAndUpdate(
        req.user._id,
        {
          username: name || user.username,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      )
      .select("-password");

    // console.log(user);
    res.status(200).send({
      success: true,
      message: "Profile Updated",
      updateuser,
    });
  } catch (error) {
    res.status(201).send({
      success: false,
      message: "Something Went Wrong Please Try Again",
      error,
    });
  }
};
//Forgotpassword Controller

const ForgotpasswdController = async (req, res) => {
  try {
    const { email, answer, newpassword } = req.body;

    //validation
    if (!email) return res.send({ message: "email is Required" });
    if (!answer) return res.send({ message: "Answer is Required" });
    if (!newpassword) return res.send({ message: "New Password is Required" });

    //check user
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }

    const hashpasswd = await hashPassword(newpassword);

    //update a password
    await userModel.findByIdAndUpdate(user._id, { password: hashpasswd });

    res.status(200).send({
      success: true,
      message: "Password is Successfully Updated",
    });

    //alldone
  } catch (error) {
    console.log("error");
    res.status(500).send({
      success: false,
      message: "Something Went Wrong Please Try Again",
      error,
    });
  }
};

//testController

const testController = (req, res) => {
  res.send("protected route");
};
export {
  RegisterController,
  LoginController,
  testController,
  ForgotpasswdController,
};
