import React, { useEffect, useState } from "react";
import AdminMenu from "../../../Components/AdminMenu";
import { styled } from "styled-components";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/authContext";
export default function CreateProducts() {
  const Navigate = useNavigate();
  const [auth] = useAuth();
  const [category, setcategory] = useState([]);
  const [catid, setcatid] = useState(null);
  const [photo, setphoto] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [quantity, setquantity] = useState("");
  const [shipping, setshipping] = useState();

  const handlerCreateProduct = () => {
    try {
      const formData = new FormData();
      formData.append("image", photo);
      formData.append("category", catid);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("shipping", shipping);

      const imgsize = formData.get("image");
      if (imgsize.size > 1000000) {
        return toast.error("Image size less thant 1MB");
      }

      axios
        .post("/api/v1/products/create-product", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: auth.token,
          },
        })
        .then((data) => {
          if (data.data.success) {
            toast.success(data.data.message);
            Navigate("/dashboard/admin/products");
          } else {
            toast.error(data.data.message);
          }
        })
        .catch((err) => {
          console.log("error is got " + err);
        });

      // console.log(data);
      // alert("Image uploaded successfully");
    } catch (error) {
      console.error(error);
    }
  };

  //fetching all category
  const getAllCategory = () => {
    fetch("/api/v1/category/get-category")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        if (data.success) {
          setcategory(data.category);
        }
      });
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <AdminMenu>
      <Formcontrol>
        <h1 className="text-center">Create Products</h1>
        {/* Drop down category menu */}
        <DropDown>
          <select
            name="category"
            required
            onChange={(e) => setcatid(e.target.value)}
          >
            <option className="o" value="">
              Select a Category
            </option>
            {category.map((cat) => {
              return (
                <option value={cat._id} key={cat._id}>
                  {cat.name}
                </option>
              );
            })}
          </select>
        </DropDown>
        {/* Images Input data  */}
        <Data>
          <h2>Select a Image</h2>
          <div>
            <input
              type="file"
              name="photo"
              id="images"
              accept="image/*"
              onChange={(e) => setphoto(e.target.files[0])}
              required
            />
          </div>
          {photo && (
            <div>
              <img src={URL.createObjectURL(photo)} alt="product photo" />
            </div>
          )}
        </Data>

        {/* //From inputs */}

        <div>
          <input
            type="text"
            name="name"
            placeholder="Write a Product Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div>
          <textarea
            type="textarea"
            name="description"
            placeholder="Write a Product Description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            name="price"
            placeholder="Enetr a Product Price"
            value={price}
            onChange={(e) => setprice(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            name="quantity"
            placeholder="Enter Product Qauntity"
            value={quantity}
            onChange={(e) => setquantity(e.target.value)}
          />
        </div>
        <div>
          <select
            name="shipping"
            id=""
            onChange={(e) => {
              setshipping(e.target.value);
            }}
          >
            <option value={0}>Select Shipping</option>
            <option value={0}>No</option>
            <option value={1}>yes</option>
          </select>
        </div>
        <div>
          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              handlerCreateProduct();
            }}
          >
            Create A Product
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
