import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductList from "../Components/ProductsList";
export default function Categories() {
  const params = useParams();
  const [Products, setProducts] = useState();

  // get category based products
  const getCatbasedProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/caterory-related/${params.slug}`
      );
      // console.log(data);
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCatbasedProduct();
  }, []);
  return (
    <Category>
      <h1>Category {params.slug}</h1>
      <p>{Products?.length} Products Found</p>
      <ProductList Productlist={Products}></ProductList>
    </Category>
  );
}

const Category = styled.div`
  padding: 20px;
  h1 {
    text-align: center;
    text-transform: capitalize;
  }
  p {
    margin: 10px;
    text-align: center;
  }
`;
