import userModel from "../Models/user.model.js";
import { comparePassword, hashPassword } from "../helper/authhelper.js";

//import json webtoken
import JWT from "jsonwebtoken";

const RegisterController = async (req, res) => {
  try {
    const { username, email, password, phone, address } = req.body;

    //validation
    if (!username) return res.send({ error: "Username is Required" });
    if (!email) return res.send({ error: "email is Required" });
    if (!password) return res.send({ error: "password is Required" });
    if (!phone) return res.send({ error: "phone Number is Required" });
    if (!address) return res.send({ error: "Address is Required" });

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
        message: "Invalid Password ",
      });
    }

    //JWT TOken

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRETE, {
      expiresIn: "5d",
    });

    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        usename: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
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

//testController

const testController = (req, res) => {
  res.send("protected route");
};
export { RegisterController, LoginController, testController };
