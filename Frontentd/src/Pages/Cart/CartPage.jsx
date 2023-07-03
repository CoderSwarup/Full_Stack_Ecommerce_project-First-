import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axois from "axios";
//payment
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-hot-toast";

export default function CartPage() {
  const Navigate = useNavigate();
  const [cart, setcart] = useCart();
  const [auth] = useAuth();

  //payment
  const [clienttoken, setclienttoken] = useState("");
  const [instanse, setinstanse] = useState("");
  const [loading, setloading] = useState(false);
  let Total = 0;

  const RemoveCartItem = (id) => {
    try {
      let mycart = [...cart];
      let index = mycart.findIndex((item) => {
        if (item?._id === id) {
          return true;
        } else {
          false;
        }
      });
      mycart.splice(index, 1);
      setcart(mycart);
      localStorage.setItem("cart", JSON.stringify(mycart));
    } catch (error) {
      console.log(error);
    }
  };

  //Total Price
  const totalPrice = () => {
    let total = 0;
    cart?.map((item) => {
      total = total + item.price;
    });

    return total;
  };

  //get payment getway token
  const getToken = async () => {
    try {
      const { data } = await axois.get("/api/v1/products/braintree/token");
      console.log(data);
      setclienttoken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handelPayment = async () => {
    try {
      setloading(true);
      const { nonce } = await instanse.requestPaymentMethod();
      const { data } = await axois.post(
        `/api/v1/products/braintree/payment`,
        {
          nonce,
          cart,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      setloading(false);
      localStorage.removeItem("cart");
      setcart([]);
      Navigate("/dashboard/user/orders");
      toast.success("Payment completed Succefully");
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };
  return (
    <Wrapper>
      <div className="plists">
        <h1>Cart Items</h1>
        <p>
          {cart?.length > 0
            ? `You have ${cart?.length} In Your Cart ${
                auth?.token ? "" : "Please Login To CheckOut"
              }`
            : "Your Cart Is Empty"}
        </p>

        <CartItem>
          {cart?.length > 0 ? (
            cart.map((item) => {
              return (
                <div className="container" key={item._id}>
                  <img
                    className="itemimg"
                    src={`/api/v1/products/product-img/${item._id}`}
                    alt=""
                  />
                  <div className="details">
                    <h3>Product Name : {item.name}</h3>
                    <p>
                      <b>Product Description : </b>
                      {item.description.slice(0, 200)}...
                    </p>
                    <b>Price : ${item.price}</b>

                    <div className="buttons">
                      <button>
                        <Link
                          style={{ textDecoration: "none", color: "#ffeded" }}
                          to={`/product/${item.slug}`}
                        >
                          More Details
                        </Link>
                      </button>
                      <button
                        onClick={() => RemoveCartItem(item._id)}
                        className="remove"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <img src="" alt="" />
          )}
        </CartItem>
      </div>
      <Checkout>
        <h2>Order Summary</h2>
        <h4>Total | CheckOut | Payments</h4>
        <div className="line"></div>
        <h2>Total : ${totalPrice()}</h2>

        <AddressButton>
          {auth?.user?.address ? (
            <>
              <div>
                {" "}
                <b>Current Address</b> : <span>{auth.user.address}</span>
              </div>
              <button onClick={() => Navigate("/dashboard/user/profile")}>
                Update Address
              </button>
            </>
          ) : auth?.token ? (
            <>
              <button>Please Lggg </button>
            </>
          ) : (
            <>
              <button
                onClick={() =>
                  Navigate("/login", {
                    state: "/cart",
                  })
                }
              >
                Please Login
              </button>
            </>
          )}

          <Payment>
            {!clienttoken || !cart.length ? (
              ""
            ) : (
              <>
                <DropIn
                  options={{
                    authorization: clienttoken,
                    paypal: {
                      flow: "vault", // vault or checkout for the payment method selection page
                    },
                  }}
                  onInstance={(instance) => setinstanse(instance)}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handelPayment();
                  }}
                  disabled={!instanse ? true : false}
                >
                  {loading ? "Processing" : "Make Payment"}
                </button>
              </>
            )}
          </Payment>
        </AddressButton>
      </Checkout>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;

  .plists {
    width: 65%;
  }
`;

const CartItem = styled.div`
  padding: 10px;
  /* background-color: red; */
  .container {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* border: 2px solid orange; */
    gap: 20px;
    margin: 20px 0;
    /* flex-wrap: wrap; */
  }
  .itemimg {
    width: 250px;
    height: 150px;
    aspect-ratio: 10/7;
    border: 2px solid #000;
  }
  .details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .buttons {
    display: flex;
    gap: 10px;

    button {
      display: block;
      color: #ffffff;
      padding: 5px 10px;
      font-size: 13px;
      font-weight: 700;
      border: 2px solid #380cff;
      background: #007ef4;
    }

    .remove {
      background: red;
      border: 2px solid #f5f3ff;
    }
  }
`;

const Checkout = styled.div`
  text-align: center;
  /* background-color: red; */
  width: 30%;
  .line {
    margin: 20px 0;
    width: 100%;
    height: 2px;
    background-color: #000;
  }
  h2 {
    margin: 10px 0;
  }
`;

const AddressButton = styled.div`
  padding: 10px;
  cursor: pointer;
  /* background: red; */
  span,
  b {
    font-size: 18px;
  }
  button {
    margin: 10px 0;
    display: inline-block;
    background: #ffb114;
    color: #fff;
    font-size: 16px;
    font-weight: 800;
    border: none;
    outline: none;
    padding: 5px 10px;
  }
  button:disabled {
    opacity: 0.6;
  }
`;

const Payment = styled.div`
  margin: 10px 0;
`;
