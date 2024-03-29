import React, { useEffect, useState } from "react";
import AdminMenu from "../../../Components/AdminMenu";
import axios from "axios";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

export default function Products() {
  const [Productlist, setProductList] = useState([]);
  const [imgs, setimg] = useState("");

  const getallProducts = () => {
    axios.get("/api/v1/products/get-products").then((data) => {
      setProductList(data.data.data);
      // console.log(data.data.data);
    });
  };

  const FetchImage = () => {
    axios
      .get("/api/v1/products/product-img/649d2db131fc022834050628")
      .then((data) => {
        // let newdata = JSON.stringify(data.data);
        // console.log("data:image/png;base64," + newdata);
        return setimg(data.data);
      });
  };

  useEffect(() => {
    FetchImage();
    getallProducts();
  }, []);
  return (
    <AdminMenu>
      <h1 style={{ textAlign: "center" }}>All Products</h1>
      <Wrapper>
        {Productlist?.map((data) => {
          return (
            <Link
              key={data._id}
              to={`/dashboard/admin/update-products/${data.slug}`}
              style={{ textDecoration: "none", color: "#000" }}
            >
              <Card>
                <div className="imgcontainer">
                  <img
                    src={`/api/v1/products/product-img/${data._id}`}
                    alt=""
                  />
                </div>
                <div className="datacontainer">
                  <h3>
                    <b>Name : </b>
                    {data.name}
                  </h3>
                  <p>
                    <b>Dscription : </b> {data.description}
                  </p>
                  <p>
                    <b>Price : </b> {data?.price}
                  </p>
                  <p>
                    <b>Qauntity </b> {data.quantity}
                  </p>
                </div>
                <button>Edit Product</button>
              </Card>
            </Link>
          );
        })}
      </Wrapper>
    </AdminMenu>
  );
}

const Wrapper = styled.div`
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

const Card = styled.div`
  padding: 8px;
  margin: 30px 0;
  border: 2px solid orange;
  width: 250px;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    text-transform: capitalize;
  }

  .imgcontainer {
    position: relative;
    background: linear-gradient(#ffa962, #ffb38d);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .datacontainer {
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  img {
    width: 100%;
    object-fit: contain;
    aspect-ratio: 20/14;
  }
  button {
    background: hsl(184.86486486486487, 100%, 63.725490196078425%);
    font-size: 17px;
    font-weight: 700;
    padding: 5px 10px;
  }
`;
