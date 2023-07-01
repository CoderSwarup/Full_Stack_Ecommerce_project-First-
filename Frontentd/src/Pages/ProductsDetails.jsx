import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import SEO from "../Components/SEO";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ProductsList from "../Components/ProductsList";
export default function ProductsDetails() {
  const params = useParams();
  const [product, setproduct] = useState({});
  const [relatedproduct, setrelatedprduct] = useState([]);

  const fetchRelatedProducts = async (pid, cid) => {
    try {
      const { data } = await axios(
        `/api/v1/products/related-product/${pid}/${cid}`
      );
      setrelatedprduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  //get Products

  const getproducts = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/single-product/${params.slug}`
      );
      setproduct(data.singleproduct);
      fetchRelatedProducts(
        data.singleproduct?._id,
        data.singleproduct?.category
      );
      // console.log(data.singleproduct);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getproducts();
  }, []);
  return (
    <>
      <Wrapper>
        <SEO title={"Product Details"}></SEO>
        <div className="left">
          <img src={`/api/v1/products/product-img/${product?._id}`} alt="" />
        </div>
        <hr />
        <div className="right">
          <h1>Product Details</h1>
          <h2>
            <b>Poduct Name :</b> {product?.name}
          </h2>
          <p>
            <b>Poduct Description:</b> {product?.description}
          </p>
          <span>
            <b>Product Price :</b> ${product?.price}
          </span>
          <b className={product?.quantity > 0 ? "green" : "red"}>
            {product?.quantity > 0
              ? "Product In Stock"
              : "Product Out Of The Stock"}
          </b>
          <button
            onClick={() => console.log("ddd")}
            disabled={product?.quantity > 0 ? false : true}
          >
            Add To Cart
          </button>
        </div>
      </Wrapper>
      <RelatedP>
        <h1>Related Products</h1>

        <ProductsList Productlist={relatedproduct}></ProductsList>
      </RelatedP>
    </>
  );
}

const Wrapper = styled.div`
  padding: 20px;

  display: flex;

  .left,
  .right {
    padding: 10px;
    width: 50%;
  }

  .left {
    display: grid;
    place-items: center;
  }
  .right {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 10px;
  }

  .green,
  .red {
    font-size: 20px;
    color: #008b00;
  }

  .red {
    color: red;
  }
  h1 {
    text-align: center;
    margin-bottom: 10px;
  }

  p {
    font-size: 17px;
  }
  span {
    font-size: 18px;
  }
  img {
    max-width: 80%;
  }

  button {
    background: #ff8d1c; /* Green */
    padding: 5px 10px;
    border: 2px solid black;
    color: #fff;
    font-size: 20px;
  }

  button:disabled {
    opacity: 0.6;
  }
`;
const RelatedP = styled.div`
  margin: 50px 0 30px 0;
  padding: 20px;
`;
