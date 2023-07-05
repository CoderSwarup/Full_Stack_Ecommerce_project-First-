import React, { useEffect, useState } from "react";
import AdminMenu from "../../../Components/AdminMenu";
import { styled } from "styled-components";
import { useAuth } from "../../../Context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct() {
  const Navigate = useNavigate();
  const params = useParams();
  const [auth] = useAuth();
  const [category, setCategory] = useState([]);
  const [catid, setCatId] = useState("");
  const [photo, setPhoto] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [pimgid, setPimgId] = useState("");

  // Update Product Handler
  const handleUpdateProduct = () => {
    try {
      const formData = new FormData();
      formData.append("image", photo);
      formData.append("category", catid);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("shipping", shipping);

      const imgSize = formData.get("image");
      if (imgSize.size > 1000000) {
        return toast.error("Image size should be less than 1MB");
      }

      axios
        .put(`/api/v1/products/update-product/${pimgid}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: auth.token,
          },
        })
        .then((response) => {
          if (response.data.success) {
            toast.success(response.data.message);
            Navigate("/dashboard/admin/products");
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          console.log("Error occurred: ", error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  // Get Single Product using the slug
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/single-product/${params.slug}`
      );
      const product = data.singleproduct;
      setPimgId(product._id);
      setName(product.name);
      setCatId(product.category);
      setDescription(product.description);
      setPrice(product.price);
      setQuantity(product.quantity);
      setShipping(product.shipping);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch All Categories
  const getAllCategories = () => {
    fetch("/api/v1/category/get-category")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCategory(data.category);
        }
      });
  };

  // Delete Product Handeler

  const handelDeleteProduct = async () => {
    try {
      if (prompt("Are You Sure Please Enter Y")) {
        const { data } = await axios.delete(
          `/api/v1/products/delete-product/${pimgid}`,
          {
            headers: {
              Authorization: auth.token,
            },
          }
        );
        // console.log(data);
        if (data.success) {
          toast.success(data.message);
          Navigate("/dashboard/admin/products");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getSingleProduct();
  }, []);

  return (
    <AdminMenu>
      <Formcontrol>
        <h1 className="text-center">Update Products</h1>

        {/* Drop-down category menu */}
        <DropDown>
          <select
            name="category"
            required
            onChange={(e) => setCatId(e.target.value)}
            value={catid}
          >
            <option className="o" value="">
              Select a Category
            </option>
            {category.map((cat) => (
              <option value={cat._id} key={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </DropDown>

        {/* Images Input data  */}
        <Data>
          <h2>Select an Image</h2>
          <div>
            <input
              type="file"
              name="photo"
              id="images"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              required
            />
          </div>
          {photo ? (
            <div>
              <img src={URL.createObjectURL(photo)} alt="product photo" />
            </div>
          ) : (
            <div>
              <img
                src={`/api/v1/products/product-img/${pimgid}`}
                alt="product photo"
              />
            </div>
          )}
        </Data>

        {/* Form inputs */}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Write a Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <textarea
            type="textarea"
            name="description"
            placeholder="Write a Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            name="price"
            placeholder="Enter a Product Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            name="quantity"
            placeholder="Enter Product Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div>
          <select
            name="shipping"
            id=""
            onChange={(e) => setShipping(e.target.value)}
            value={shipping ? "1" : "0"}
          >
            <option value="">Select Shipping</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        <div>
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              handleUpdateProduct();
            }}
          >
            Update A Product
          </button>
          <button
            className="btn delete"
            onClick={(e) => {
              e.preventDefault();
              handelDeleteProduct();
            }}
          >
            Delete A product
          </button>
        </div>
      </Formcontrol>
    </AdminMenu>
  );
}

const Formcontrol = styled.form`
  width: 100%;

  input,
  select,
  textarea {
    width: 100%;
    padding: 10px;
    font-size: 17px;
    margin: 15px 0;
  }

  .btn {
    transition: all 0.5s ease;
    &:hover {
      background-color: #ff9900;
      color: #fff;
    }
  }

  .delete {
    margin: 20px 0;
    border: 2px solid red;
    &:hover {
      background-color: #ff0000;
      color: #fff;
    }
  }
`;

const DropDown = styled.div`
  select {
    width: 100%;
    padding: 10px 20px;
    text-align: center;
    font-size: 18px;
    text-transform: capitalize;
    option {
      margin: 10px;
    }
  }
`;

const Data = styled.div`
  margin: 30px 0;

  input[type="file"] {
    margin: 10px 0;
    width: 350px;
    max-width: 100%;
    color: #444;
    padding: 5px;
    background: #fff;
    border-radius: 10px;
    border: 1px solid #555;
  }

  input[type="file"]::file-selector-button {
    margin-right: 20px;
    border: none;
    background: #084cdf;
    padding: 10px 20px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
  }

  input[type="file"]::file-selector-button:hover {
    background: #0d45a5;
  }

  img {
    width: 200px;
    height: 200px;
    aspect-ratio: 16/9;
  }
`;
