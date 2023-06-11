import JWT from "jsonwebtoken";
import userModel from "../Models/user.model.js";

//Protech user using token based

export const requireSign = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRETE
    );

    req.user = decode; // here is the decoding of the user to find the user id
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin access middleware

export const isadmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "error in admin middleware ",
    });
  }
};
