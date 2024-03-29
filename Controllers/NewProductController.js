import slugify from "slugify";
import NewProductModelModel from "../Models/NewProductModel.model.js";
import categoryModel from "../Models/category.model.js";

// Create a Product Controller
export const newCreateProductController = (req, res) => {
  try {
    const { originalname, buffer, mimetype, size } = req.file;
    // console.log(req.body, mimetype, size, originalname, buffer);
    const { name, description, price, category, quantity, shipping } = req.body;

    //validation
    switch (true) {
      case !originalname:
        return res
          .status(201)
          .send({ success: false, message: "Image is Required " });
        break;
      case !name:
        return res
          .status(201)
          .send({ success: false, message: "name is requried" });

        break;
      case !description:
        return res
          .status(201)
          .send({ success: false, message: "description is requried" });

        break;
      case !price:
        return res
          .status(201)
          .send({ success: false, message: "price is requried" });

        break;
      case !category:
        return res
          .status(201)
          .send({ success: false, message: "category is requried" });

        break;
      case !quantity:
        return res
          .status(201)
          .send({ success: false, message: "quantity is requried" });

        break;

      case size > 1000000:
        return res.status(422).send({
          success: false,
          message: "Photo is required and Size Less Than 1mb",
        });

        break;
    }

    const image = new NewProductModelModel({
      name,
      slug: slugify(name),
      description,
      price,
      category,
      quantity,
      shipping,
      photo: buffer,
      photo_type: mimetype,
    })
      .save()
      .then((done) => {
        if (done) {
          // console.error(done);
          res.send({
            success: true,
            message: "Product Created successfully",
            image,
          });
        } else {
          res.status(201).send({
            success: false,
            message: "Error n Creating Product",
          });
        }
      });

    //validaton complete
  } catch (error) {
    console.log(error);
    res.status(201).send({
      success: false,
      message: "Error In Create Product",
    });
  }
};

// all Products Api

export const GetProducts = async (req, res) => {
  try {
    const products = await NewProductModelModel.find({}).select("-photo");
    // .limit(5)
    // .sort({ createdAt: -1 });

    // const image = await NewProductModelModel.find().select("photo");
    // console.log(image);

    const encodedImages = products.map((i) => {
      // const base64Image = i.photo.toString("base64");
      return {
        _id: i._id,
        name: i.name,
        slug: i.slug,
        description: i.description,
        price: i.price,
        quantity: i.quantity,
        shipping: i.shipping,
        category: i.category,
        photo_type: i.photo_type,
        // image: base64Image,
      };
    });

    res.status(201).send({
      success: true,
      message: "Products Founded",
      total: products.length,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In getting Product",
      error,
    });
  }
};

// //photo controller

export const ProductPhotoController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await NewProductModelModel.findById(id).select("photo");

    // OLD METHOD ________----------------
    // const base64Image = product.photo.toString("base64");
    // const main = "data:image/svg+xml;base64,";
    // console.log(main + base64Image);
    // const newdata = main + base64Image;
    // res.json(newdata);
    // console.log(product);
    //----------------

    // New Method
    const isSVG = product.photo.slice(0, 4).toString() === "<svg";

    if (isSVG) {
      res.set("Content-Type", "image/svg+xml");
    } else {
      res.set("Content-Type", "image/jpeg");
    }

    // res.set("Content-Type", "image/jpeg");
    res.send(product.photo);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In getting Product",
      error,
    });
  }
};

//get Single product by using the slug

export const GetSingleproducts = async (req, res) => {
  try {
    const singleproduct = await NewProductModelModel.findOne({
      slug: req.params.slug,
    }).select("-photo");

    res.status(201).send({
      success: true,
      message: "Single Product Fetched",
      singleproduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In getting Product",
      error,
    });
  }
};

// Update Product

export const UpdateProdcutController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, quantity, shipping } = req.body;

    let buffer, mimetype;

    // Check if an image file is provided
    if (req.file) {
      buffer = req.file.buffer;
      mimetype = req.file.mimetype;
    }

    const product = await NewProductModelModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
        description,
        price,
        category,
        quantity,
        shipping,
        photo: buffer,
        photo_type: mimetype,
      },
      { new: true }
    );

    if (!product) {
      return res.status(200).send({
        success: false,
        message: "Product not found",
      });
    }

    res.status(201).send({
      success: true,
      data: product,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating product",
    });
  }
};

// //delete p controller

export const DeleteDroductController = async (req, res) => {
  try {
    await NewProductModelModel.findByIdAndDelete(req.params.id).select(
      "-photo"
    );
    res.status(201).send({
      success: true,
      message: "product is deleted ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In getting Product",
      error,
    });
  }
};

//filters controller

export const ProductFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked?.length > 0) args.category = checked;
    if (radio?.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await NewProductModelModel.find(args).select("-photo");
    // console.log(products);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Filtering Product",
      error,
    });
  }
};

//product count

export const ProductCountController = async (req, res) => {
  try {
    const Productstotal = await NewProductModelModel.find(
      {}
    ).estimatedDocumentCount();
    return res.status(200).send({
      success: true,
      total: Productstotal,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error In Product Count",
      error,
    });
  }
};

// product pages
export const ProductPageController = async (req, res) => {
  try {
    const perpage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await NewProductModelModel.find({})
      .select("-photo")
      .skip((page - 1) * perpage)
      .limit(perpage)
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error In Product Pages Get",
      error,
    });
  }
};

//Search product

export const SearchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    console.log(keyword);
    const product = await NewProductModelModel.find({
      $or: [
        { name: { $regex: keyword } },
        { description: { $regex: keyword } },
      ],
    }).select("-photo -photo_type");
    res.send({ product });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Product Searching",
      error,
    });
  }
};

// Related Products

export const RelatedPrductController = async (req, res) => {
  try {
    const { pid, catid } = req.params;

    if (!pid || !catid) {
      throw new Error("Invalid pid or catid");
    }

    const relatedProducts = await NewProductModelModel.find({
      category: catid,
      _id: {
        $ne: pid,
      },
    }).select("-photo");

    res.status(200).send({
      success: true,
      message: "Related Products Found",
      products: relatedProducts,
    });

    // console.log(relatedProducts);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Fetching Related Products",
      error: error.message,
    });
  }
};

//Category Based Product
export const CategoryBasedController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug });
    // console.log(category);
    const products = await NewProductModelModel.find({
      category: category._id,
    }).select("-photo");

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Fetching Category Based Related Products",
      error: error.message,
    });
  }
};
