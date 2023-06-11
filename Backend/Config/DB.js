import mongoose from "mongoose";

const Connect = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connection Successful ");
    })
    .catch((err) => {
      console.log("error : " + err);
    });
};
export default Connect;
