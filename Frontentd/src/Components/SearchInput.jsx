import React from "react";
import { styled } from "styled-components";
import { useSearch } from "../Context/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SearchInput() {
  const [values, setvalues] = useSearch();
  const Naviagte = useNavigate();

  const handelserach = async () => {
    try {
      const response = await axios.get(
        `/api/v1/products/search/${values.keyword}`
      );
      const data = response.data.product; // Extract the 'product' data from the response
      //   console.log("tuytyuyu", data);
      setvalues({ ...values, results: data });
      //   console.log(values);
      Naviagte("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Search>
      <input
        type="text"
        value={values.keyword}
        onChange={(e) => setvalues({ ...values, keyword: e.target.value })}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          handelserach();
        }}
      >
        Search
      </button>
    </Search>
  );
}

const Search = styled.div`
  border: 2px solid orange;
  border-radius: 5px;
  overflow: hidden;
  input,
  button {
    padding: 5px 10px;
    font-size: 16px;
    border: none;
    outline: none;
  }
  button {
    background: #ff8811;
    color: #fff;
  }
`;
