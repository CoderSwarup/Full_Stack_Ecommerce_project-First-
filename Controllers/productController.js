// import productsModel from "../Models/products.model.js";
// import fs from "fs";
// import slugify from "slugify";
// export const CreateProductController = async (req, res) => {
//   try {
//     console.log(req.body);
//     const {
//       name,
//       slug,
//       description,
//       price,
//       category,
//       quantity,
//       shipping,
//       photo,
//     } = req.body;

//     //validation
//     switch (true) {
//       case !name:
//         return res
//           .status(500)
//           .send({ success: false, message: "name is requried" });

//         break;
//       case !description:
//         return res
//           .status(500)
//           .send({ success: false, message: "description is requried" });

//         break;
//       case !price:
//         return res
//           .status(500)
//           .send({ success: false, message: "price is requried" });

//         break;
//       case !category:
//         return res
//           .status(500)
//           .send({ success: false, message: "category is requried" });

//         break;
//       case !quantity:
//         return res
//           .status(500)
//           .send({ success: false, message: "quantity is requried" });

//         break;

//       case photo && photo.size > 1000000:
//         return res.status(422).send({
//           success: false,
//           message: "Photo is required and Size Less Than 1mb",
//         });

//         break;
//     }

//     //validaton complete

//     const product = new productsModel({
//       name,
//       slug,
//       description,
//       price,
//       category,
//       quantity,
//       shipping,
//       photo,
//       slug: slugify(name),
//     });

//     if (photo) {
//       Images.create({ photo });
//     }

//     await product.save();

//     res.status(201).send({
//       success: true,
//       data: { ...product._doc },
//       message: "Product Created Successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error In Create Product",
//     });
//   }
// };

// //get product controller

// export const getproducts = async (req, res) => {
//   try {
//     const products = await productsModel
//       .find({})
//       .select("-photo")
//       .limit(5)
//       .sort({ createdAt: -1 });

//     res.status(201).send({
//       success: true,
//       message: "Products Founded",
//       total: products.length,
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error In getting Product",
//       error,
//     });
//   }
// };

// //get single product

// export const getsingleproducts = async (req, res) => {
//   try {
//     const singleproduct = await productsModel
//       .findOne({
//         slug: req.params.slug,
//       })
//       .select("-photo");

//     res.status(201).send({
//       success: true,
//       message: "Single Product Fetched",
//       singleproduct,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error In getting Product",
//       error,
//     });
//   }
// };

// //photo controller
// export const productphotoController = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await productsModel.findById(id).select("photo");
//     if (product.photo.data) {
//       //   res.set("content-type", product.photo.contentType);
//       return res.status(201).send({
//         success: true,
//         message: "Image is found",
//         photo: product.photo.data,
//       });
//     } else {
//       return res.status(500).send({
//         success: false,
//         message: "Image is not found",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error In getting Product",
//       error,
//     });
//   }
// };

// //delete p controller

// export const deleteproductcontroller = async (req, res) => {
//   try {
//     await productsModel.findByIdAndDelete(req.params.id).select("-photo");
//     res.status(201).send({
//       success: true,
//       message: "product is deleted ",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error In getting Product",
//       error,
//     });
//   }
// };

// //updat productr
// export const updateProdcutController = async (req, res) => {
//   try {
//     const { name, slug, description, price, category, quantity, shipping } =
//       req.fields;

//     const { photo } = req.files;

//     //validation
//     switch (true) {
//       case !name:
//         return res
//           .status(500)
//           .send({ success: false, message: "name is requried" });

//         break;
//       case !description:
//         return res
//           .status(500)
//           .send({ success: false, message: "description is requried" });

//         break;
//       case !price:
//         return res
//           .status(500)
//           .send({ success: false, message: "price is requried" });

//         break;
//       case !category:
//         return res
//           .status(500)
//           .send({ success: false, message: "category is requried" });

//         break;
//       case !quantity:
//         return res
//           .status(500)
//           .send({ success: false, message: "quantity is requried" });

//         break;

//       case photo && photo.size > 1000000:
//         return res.status(422).send({
//           success: false,
//           message: "Photo is required and Size Less Than 1mb",
//         });

//         break;
//     }

//     //validaton complete

//     const product = await productsModel.findByIdAndUpdate(
//       req.params.id,
//       {
//         ...req.fields,
//         slug: slugify(name),
//       },
//       { new: true }
//     );
//     if (!product) {
//       return res.status(200).send({
//         success: false,
//         message: "product not get",
//       });
//     }

//     res.status(201).send({
//       success: true,
//       data: { ...product._doc },
//       message: "Product Updated Successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error In Update Product",
//     });
//   }
// };

import Image from "../Models/products.model.js";

export const createProductcontroller = (req, res) => {
  const { originalname, buffer, mimetype } = req.file;
  // console.log(req.file);

  new Image({
    name: originalname,
    image: buffer,
    type: mimetype,
  })
    .save()
    .then((done) => {
      if (done) {
        // console.error(done);
        res.send({
          success: true,
          messge: "Image uploaded successfully",
        });
      } else {
        res.status(500).send({
          success: false,
          messge: "Error uploading image",
        });
      }
    });
};

export const getproductcontroller = async (req, res) => {
  try {
    const image = await Image.find();
    // console.log(image);

    const encodedImages = image.map((i) => {
      const base64Image = i.image.toString("base64");
      const imagetype = i.image.type;
      return { type: imagetype, name: image.name, image: base64Image };
    });
    res.send({
      success: true,
      message: "images data is get",
      encodedImages,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      messge: "Error getting image time",
    });
  }
};
