import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "Deliverd", "Cancel"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("order", OrderSchema);
