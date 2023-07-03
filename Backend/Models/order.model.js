import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],
    payment: [],
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Order Process",
      enum: [
        "Not Process",
        "Order Process",
        "Processing",
        "Shipped",
        "Deliverd",
        "Cancel",
      ],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("order", OrderSchema);
