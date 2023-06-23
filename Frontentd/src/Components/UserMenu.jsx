import React, { useState } from "react";
import { styled } from "styled-components";
import SEO from "./SEO";
import { NavLink } from "react-router-dom";

export default function UserMenu({ children }) {
  const [btnno, setbtnno] = useState(0);
  const btnlist = [
    { no: 1, src: "profile", name: "profile" },
    { no: 2, src: "orders", name: "orders" },
  ];

  const setBtnNo = (no) => {
    setbtnno(no);
  };

  return (
    <>
      <SEO></SEO>
      <Menu>
        <DashRight>
          <NavLink
            style={{ textDecoration: "none", color: "#000" }}
            to={`/dashboard/user`}
          >
            <h1>DASHBOARD</h1>
          </NavLink>
          {btnlist.map((btn) => (
            <NavLink
              key={btn.no}
              onClick={() => setBtnNo(btn.no)}
              className={btn.no === btnno ? "btn active" : "btn"}
              style={{ textDecoration: "none" }}
              to={`/dashboard/user/${btn.src}`}
            >
              {btn.name}
            </NavLink>
          ))}
        </DashRight>
        <div className="left">{children}</div>
      </Menu>
    </>
  );
}

const Menu = styled.div`
  display: flex;
  gap: 80px;
  margin: 10px 20px;
  padding: 20px;

  h1 {
    margin-bottom: 10px;
    cursor: pointer;
  }
  .btn {
    text-align: center;
    text-transform: capitalize;
    display: block;
    width: 100%;
    margin: 2px 0;
    padding: 10px;
    border-radius: 5px;
    border: 0.7px solid #ff6a00;
    color: #000;
    background: #fff;
    cursor: pointer;
    font-size: 18px;
    font-weight: 600;
  }

  .btn.active {
    color: #fff !important ;
    background: linear-gradient(to right, #ff6a00, #ffac7c);
  }

  /* button {
    display: block;
    width: 100%;
    margin: 2px 0;
    padding: 10px;
    border-radius: 5px;
    border: 0.7px solid #ff6a00;
    background: #fff;
    cursor: pointer;
    font-size: 18px;
    font-weight: 600;
  } */
`;

const DashRight = styled.div`
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
`;
