import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
import SearchInput from "./SearchInput";
import useCategory from "../Hooks/useCategory";
import { useCart } from "../Context/CartContext";

export default function Navbar() {
  const [auth, setauth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();
  const [navControlle, setNavControlle] = useState(false);

  const handlerLogout = () => {
    setauth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const change = () => {
    setNavControlle(!navControlle);
  };

  return (
    <Nav>
      <Link style={{ textDecoration: "none" }} to="/">
        <div className="logo">
          <h1> 🛒 Ecommerce</h1>
        </div>
      </Link>

      <div className={navControlle ? "navlinks active" : "navlinks"}>
        <div className="hamberger" onClick={change}>
          <img src="./image/menu.png" alt="" />
        </div>
        <SearchInput change={change}></SearchInput>
        <NavLink
          style={{ textDecoration: "none" }}
          to="/"
          className="li"
          onClick={change}
        >
          <li>Home</li>
        </NavLink>

        {/* Category filter */}
        <div className="dropdown">
          <NavLink
            style={{ textDecoration: "none", color: "#000" }}
            to="/"
            className="li"
          >
            <span>Category ⬇️</span>
          </NavLink>
          <div className="dropdown-content">
            {categories.map((data) => {
              return (
                <NavLink
                  key={data._id}
                  style={{ textDecoration: "none", color: "#000" }}
                  to={`/category/${data.slug}`}
                  className="li"
                  onClick={change}
                >
                  <p style={{ fontSize: "15px", textAlign: "center" }}>
                    {data.name}
                  </p>
                </NavLink>
              );
            })}
          </div>
        </div>

        <NavLink
          style={{ textDecoration: "none" }}
          to="/contact"
          className="li"
          onClick={change}
        >
          <li>Contact</li>
        </NavLink>

        {!auth.user ? (
          <>
            <NavLink
              style={{ textDecoration: "none" }}
              to="/login"
              className="li"
              onClick={change}
            >
              <li>Login</li>
            </NavLink>

            <NavLink
              style={{ textDecoration: "none" }}
              to="/signup"
              className="li"
              onClick={change}
            >
              <li>SignUP</li>
            </NavLink>
          </>
        ) : (
          <div className="dropdown">
            <NavLink
              style={{ textDecoration: "none", color: "#000" }}
              to="/"
              className="li"
            >
              <span>{auth?.user?.username} ⬇️</span>
            </NavLink>
            <div className="dropdown-content">
              <NavLink
                style={{ textDecoration: "none", color: "#000" }}
                to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                className="li"
                onClick={change}
              >
                <p>DashBoard</p>
              </NavLink>
              <NavLink
                onClick={() => {
                  handlerLogout(), change();
                }}
                style={{ textDecoration: "none", color: "#000" }}
                to="/login"
                className="li"
              >
                <p>LogOut</p>
              </NavLink>
            </div>
          </div>
        )}

        <NavLink
          style={{ textDecoration: "none" }}
          to="/cart"
          className="li"
          onClick={change}
        >
          <li className="cartitem">
            🛒 <span>{cart?.length}</span>
          </li>
        </NavLink>
      </div>
      <div className="hamberger" onClick={change}>
        <img src="./image/menu.png" alt="" />
      </div>
    </Nav>
  );
}

const Nav = styled.nav`
  padding: 20px 20px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff4ed;

  .logo {
    h1 {
      color: #ff6905;
    }
  }

  .navlinks {
    display: flex;
    gap: 12px;
    font-size: 1.3rem;
    text-decoration: none;
    position: relative;

    li {
      color: #000;
      font-family: "Inconsolata", monospace;
      font-weight: 700;
      list-style: none;
      transition: all 0.4s ease;
      border-bottom: 2px solid transparent;
      letter-spacing: 0.9px;
      padding: 2px 0;
      &:hover,
      &:visited {
        color: #ff6905;
        border-bottom: 2px solid black;
      }
    }

    .dropdown {
      position: relative;
      display: inline-block;
      background: transparent;

      cursor: pointer;

      span {
        text-transform: uppercase;
        padding: 0 8px;
        font-size: 20px;
        margin: 6px 0;
      }
    }

    .dropdown-content {
      display: none;
      position: absolute;
      background-color: #fff;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      padding: 10px;
      z-index: 1;

      p {
        margin: 8px 0;
        padding: 8px;
        font-size: 18px;
        letter-spacing: 1px;
        font-weight: bolder;
        border: 1px solid #ff6905;

        &:hover {
          background-color: #ff6905;
          color: #fff;
          border: 1px solid none;
        }
      }
    }

    .dropdown:hover .dropdown-content {
      display: block;
    }
  }
  .cartitem {
    /* background: red; */
    margin-right: 5px;
    position: relative;
    span {
      position: absolute;
      top: -5px;
      right: -5px;
      background: red;
      color: #fff;
      padding: 3px;
      font-size: 12px;
      border-radius: 50%;
    }
  }

  .hamberger {
    filter: invert(100%);
    display: none;
  }

  @media screen and (max-width: 1050px) {
    /* background: #f25d00; */
    position: relative;
    .hamberger {
      display: block;
    }

    .navlinks {
      justify-content: center;
      align-items: flex-end;
      flex-direction: column !important;
      position: absolute;
      top: 0;
      right: 0;
      padding: 20px;
      z-index: 100;
      background-color: #ffe7a6;
      translate: 0 -100%;
      transition: all 0.8s ease-in-out;
    }

    .navlinks.active {
      translate: 0 0;
      translate: 0px;
    }

    .cartitem {
      filter: invert(100%);
    }
  }
`;
