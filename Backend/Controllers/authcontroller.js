import userModel from "../Models/user.model.js";
import { hashPassword } from "../helper/authhelper.js";

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

export { RegisterController };
