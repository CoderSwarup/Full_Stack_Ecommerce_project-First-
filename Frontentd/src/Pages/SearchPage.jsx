import React from "react";
import { useSearch } from "../Context/Search";
import SEO from "../Components/SEO";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import ProductsList from "../Components/ProductsList";
export default function SearchPage() {
  const [values] = useSearch();
  return (
    <>
      <SEO title="Search Result"></SEO>
      <Container>
        <h1 className="text-center">Search Results</h1>
        <h6>
          {values?.results.length < 1
            ? "No Product Found"
            : ` ${values?.results.length} Products Found`}
        </h6>

        <ProductsList Productlist={values?.results}></ProductsList>
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 20px;
  h6 {
    font-size: 17px;
  }
`;
