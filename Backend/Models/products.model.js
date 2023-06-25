import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a product's Name"],
      trim: true,
    },

    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      min: [1, "Quantity must be greater than or equal to one"],
      required: true,
    },
    // use npm i express-formidable package for upload img
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Products", ProductSchema);
