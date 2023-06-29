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
    photo: {
      type: Buffer,
      required: true,
    },

    photo_type: {
      type: String,
      default: "image/*",
    },
    shipping: {
      type: Boolean,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Products", ProductSchema);
