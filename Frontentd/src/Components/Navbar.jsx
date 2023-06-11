import React from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

export default function Navbar() {
  return (
    <Nav>
      <div className="logo">
        <h1> 🛒 Ecommerce</h1>
      </div>
      <div className="navlinks ">
        <NavLink style={{ textDecoration: "none" }} to="/" className="li">
          <li>Home</li>
        </NavLink>
        <NavLink style={{ textDecoration: "none" }} to="/about" className="li">
          <li>About</li>
        </NavLink>

        <NavLink
          style={{ textDecoration: "none" }}
          to="/contact"
          className="li"
        >
          <li>Contact</li>
        </NavLink>

        <NavLink style={{ textDecoration: "none" }} to="/login" className="li">
          <li>Login</li>
        </NavLink>

        <NavLink style={{ textDecoration: "none" }} to="/signup" className="li">
          <li>SignUP</li>
        </NavLink>
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
  }
`;
