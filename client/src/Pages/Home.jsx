import React, { useEffect, useState } from "react";

import SEO from "../Components/SEO";
import { styled } from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { Prices } from "./Prices";
import ProductsList from "../Components/ProductsList";
export default function Home() {
  const [Productlist, setProductList] = useState([]);
  const [CategoryList, setcategorylist] = useState([]);
  const [checked, setchecked] = useState([]);
  const [radio, setradio] = useState([]);
  const [total, settotal] = useState(0);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(false);

  //filter product
  const handelFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setchecked(all);
  };

  //get all products list
  const getallProducts = () => {
    setloading(true);
    axios.get(`/api/v1/products/product-page/${page}`).then((data) => {
      setloading(false);
      setProductList(data.data.products);
      // console.log(data.data.data);
    });
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
          setcategorylist(data.category);
        }
      });
  };

  //get total count products
  const getTotalCount = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/product-count");
      settotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //loadmore
  const loadmore = async () => {
    try {
      setloading(true);
      const { data } = await axios.get(`/api/v1/products/product-page/${page}`);
      setloading(false);
      setProductList([...Productlist, ...data?.products]);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };
  useEffect(() => {
    if (page == 1) return;
    loadmore();
  }, [page]);

  useEffect(() => {
    if (!checked?.length || !radio?.length) getallProducts();
    getAllCategory();
    getTotalCount();
  }, [checked.length, radio.length]);

  //get filter Product
  const getFilterProducts = async () => {
    try {
      const { data } = await axios.post("/api/v1/products/product-filters", {
        checked,
        radio,
      });
      setProductList(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getFilterProducts();
  }, [checked, radio]);

  return (
    <>
      <SEO title="All Products - Best Offers"></SEO>
      <Banner>
        <img
          src="https://img.freepik.com/free-vector/online-shopping-landing-page_33099-1725.jpg?w=1060&t=st=1688477594~exp=1688478194~hmac=8e22699aafead7f0a95f162ad8ac9c1081342339ce1ae5887a2519d12221ec5f"
          alt="Banner"
        />
      </Banner>
      <HomePage>
        <Filter>
          <h1>Filter Products</h1>

          {/* Category filter */}
          <h3>Filter By Category </h3>
          <ul>
            {CategoryList?.map((cat) => {
              return (
                <li key={cat._id}>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    onChange={(e) => handelFilter(e.target.checked, cat._id)}
                  />
                  <span>{cat.name}</span>
                </li>
              );
            })}
          </ul>

          {/* Price filter */}
          <h3>Filter By Price</h3>
          <ul>
            {Prices.map((price) => {
              return (
                <li key={price._id}>
                  <input
                    type="radio"
                    name="price"
                    onChange={(e) => setradio(price.array)}
                  />
                  <span>{price.name}</span>
                </li>
              );
            })}
          </ul>

          <button className="btn" onClick={() => window.location.reload()}>
            RESET
          </button>
        </Filter>

        <Products>
          <h1>Products List</h1>

          <ProductsList Productlist={Productlist}></ProductsList>

          <div className="pagination">
            {Productlist && Productlist.length < total && (
              <button
                className="loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setpage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "LoadMore"}
              </button>
            )}
          </div>
        </Products>
      </HomePage>
    </>
  );
}

const Banner = styled.div`
  width: 100%;
  height: 500px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: center;
  }
  @media screen and (max-width: 750px) {
    height: 200px;
  }
`;

const HomePage = styled.div`
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;

  .btn {
    margin: 20px 0;
    padding: 7px 16px;
    border: 2px solid red;
    font-size: 18px;
    font-weight: 800;
    transition: all 0.21s ease-in-out;
    &:hover {
      color: #fff;
      background: red;
    }
  }
`;

const Filter = styled.div`
  width: 25%;
  h1 {
    text-align: center;
  }
  h3 {
    margin: 10px 0;
  }

  li {
    margin: 10px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    input[type="checkbox"] {
      width: 30px;
      height: 20px;
    }

    input[type="radio"] {
      width: 30px;
      height: 20px;
    }

    span {
      font-size: 18px;
      font-weight: 800;
      text-transform: capitalize;
    }

    @media screen and (max-width: 600px) {
      span {
        font-size: 13px;
        font-weight: normal;
      }
    }
  }

  @media screen and (max-width: 600px) {
    width: 35%;
    h1 {
      font-size: 17px;
    }
    h3 {
      font-size: 15px;
    }
    span {
      font-size: 13px;
      font-weight: normal;
    }
  }
`;

const Products = styled.div`
  width: 70%;
  .loadmore {
    text-align: center;
    background-color: #b15000;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 800;
    color: white;
    border: none;
  }

  @media screen and (max-width: 600px) {
    width: auto;
    h1 {
      text-align: center;
      font-size: 18px;
    }
  }
`;
