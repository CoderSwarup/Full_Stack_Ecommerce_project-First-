import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
import SearchInput from "./SearchInput";
import useCategory from "../Hooks/useCategory";

export default function Navbar() {
  const [auth, setauth] = useAuth();
  const categories = useCategory();

  const handlerLogout = () => {
    setauth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <Nav>
      <div className="logo">
        <h1> 🛒 Ecommerce</h1>
      </div>
      <div className="navlinks ">
        <SearchInput></SearchInput>
        <NavLink style={{ textDecoration: "none" }} to="/" className="li">
          <li>Home</li>
        </NavLink>

        {/* Category filter */}
        <div class="dropdown">
          <NavLink
            style={{ textDecoration: "none", color: "#000" }}
            to="/"
            className="li"
          >
            <span>Category ⬇️</span>
          </NavLink>
          <div class="dropdown-content">
            {categories.map((data) => {
              return (
                <NavLink
                  key={data._id}
                  style={{ textDecoration: "none", color: "#000" }}
                  to={`/category/${data.slug}`}
                  className="li"
                >
                  <p style={{ fontSize: "15px", textAlign: "center" }}>
                    {data.name}
                  </p>
                </NavLink>
              );
            })}{" "}
          </div>
        </div>

        <NavLink
          style={{ textDecoration: "none" }}
          to="/contact"
          className="li"
        >
          <li>Contact</li>
        </NavLink>

        {!auth.user ? (
          <>
            <NavLink
              style={{ textDecoration: "none" }}
              to="/login"
              className="li"
            >
              <li>Login</li>
            </NavLink>

            <NavLink
              style={{ textDecoration: "none" }}
              to="/signup"
              className="li"
            >
              <li>SignUP</li>
            </NavLink>
          </>
        ) : (
          // <NavLink
          //   onClick={handlerLogout}
          //   style={{ textDecoration: "none" }}
          //   to="/login"
          //   className="li"
          // >
          //   <li>LogOut</li>
          // </NavLink>

          // <ul className="dropdown">
          //   {auth?.user?.usename} ⬇️
          //   <li>DashBoard</li>
          //   <li>LogOut</li>
          // </ul>

          <div class="dropdown">
            <NavLink
              style={{ textDecoration: "none", color: "#000" }}
              to="/"
              className="li"
            >
              <span>{auth?.user?.usename} ⬇️</span>
            </NavLink>
            <div class="dropdown-content">
              <NavLink
                style={{ textDecoration: "none", color: "#000" }}
                to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                className="li"
              >
                <p>DashBoard</p>
              </NavLink>
              <NavLink
                onClick={handlerLogout}
                style={{ textDecoration: "none", color: "#000" }}
                to="/login"
                className="li"
              >
                <p>LogOut</p>
              </NavLink>
            </div>
          </div>
        )}

        <NavLink style={{ textDecoration: "none" }} to="/cart" className="li">
          <li> Cart</li>
        </NavLink>
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
`;
