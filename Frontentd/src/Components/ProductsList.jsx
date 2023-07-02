import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { useCart } from "../Context/CartContext";
import { toast } from "react-hot-toast";
export default function ProductsList({ Productlist }) {
  const [cart, setcart] = useCart();

  return (
    <Wrapper>
      {Productlist?.length == 0 ? <h1>Not get Products</h1> : ""}
      {Productlist?.map((data) => {
        return (
          <Card key={data._id}>
            <div className="imgcontainer">
              <img src={`/api/v1/products/product-img/${data._id}`} alt="" />
            </div>
            <div className="datacontainer">
              <h3>{data.name}</h3>
              <p>{data.description.slice(0, 200)}...</p>
              <b>Price : ${data.price}</b>
              <Button>
                <button>
                  <Link
                    style={{ textDecoration: "none", color: "#ffeded" }}
                    to={`/product/${data.slug}`}
                  >
                    More Details
                  </Link>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setcart([...cart, data]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, data])
                    );
                    toast.success("Product Add To Cart");
                    console.log(cart);
                  }}
                >
                  Add To Cart
                </button>
              </Button>
            </div>
          </Card>
        );
      })}
    </Wrapper>
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
    height: 60%;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 5px;
  }

  img {
    width: 100%;
    object-fit: contain;
    aspect-ratio: 20/14;
  }
`;

const Button = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  button {
    width: 50%;
    color: #ffffff;
    padding: 5px 10px;
    font-size: 13px;
    font-weight: 700;
    border: 2px solid #380cff;
    background: #007ef4;
  }
  button:nth-child(2) {
    background: #000;
    border: 2px solid #fff;
  }
`;
