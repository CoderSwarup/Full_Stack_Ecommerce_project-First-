# >> How To upload and get the image the using multer package

install this packages

```
npm install express mongoose multer
```

> > Setup the Sever file with the mongoose connection
> > Crete a Model / Schema file

```js
import mongoose from "mongoose";
const imageSchema = new mongoose.Schema({
  name: String,
  image: Buffer,
});

export default mongoose.model("Image", imageSchema);
```

> > After crte a one router file ex: ProducteRoutes.js

```js
import express from "express";
import {
  createProductcontroller,
  getproductcontroller,
} from "../Controllers/productController.js";
import { isadmin, requireSign } from "../Middleware/authMiddleware.js";

import multer from "multer";

const upload = multer({
  limits: { fileSize: 1024 * 1024 }, // 1MB
});
const ProductRouter = express.Router();

ProductRouter.post(
  "/create-product",
  requireSign,
  isadmin,

  upload.single("image"),
  createProductcontroller
);

ProductRouter.get("/get-products", getproductcontroller);

export default ProductRouter;
```

> > Now Create a one Controller file

```js
import Image from "../Models/products.model.js";

export const createProductcontroller = (req, res) => {
  const { originalname, buffer } = req.file;

  new Image({
    name: originalname,
    image: buffer,
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

    const encodedImages = image.map((i) => {
      const base64Image = i.photo.toString("base64");
      return { name: image.name, image: base64Image };
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
```

### Here The Backend Work is dome Now in the frontend \

```jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState([]);

  //   use to save the file that user enter
  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  //after clickking the the upload button
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);
      console.log(formData.get('image))

      const { data } = await axios.post(
        "/api/v1/products/create-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDk4MzM0NGVlYzE4YjhmN2IxNTg2OTgiLCJpYXQiOjE2ODc5NjE1MzUsImV4cCI6MTY4OTE3MTEzNX0._sV6aVradY9jLdwDgfVkX9v61lvcnbSQZaDER-byd8g",
          },
        }
      );

      //   console.log(data);
      alert("Image uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Error uploading image");
    }
  };

  //   fectch the all images
  const fetchImage = async () => {
    try {
      const response = await axios.get("/api/v1/products/get-products");

      //   console.log(response.data);
      if (response.data) {
        setImageUrl(response.data.encodedImages);
        // console.log(response.data.encodedImages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div>
      <h1>Image Upload</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      <div>
        {imageUrl && (
          <>
            <h2>Image Preview:</h2>
            {imageUrl.length > 0 ? (
              imageUrl.map((image, index) => (
                <img
                  key={index}
                  src={`data:image/png;base64,${image.image}`}
                  alt={`Image ${index + 1}`}
                  style={{ width: "300px", marginBottom: "20px" }}
                />
              ))
            ) : (
              <p>No images found</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
```

## All is Done 👌

# Also use following code to convert the buffer array data to base64

```js
const base = btoa(
    String.fromCharCode(...new Uint8Array([data array]))
    )

 <img src={`data:image/png;base64,${base}`} alt="" />

```

# How to display thet images on the frontend

```js
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
```
