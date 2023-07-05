import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";
export default function SignUP() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [answer, setanswer] = useState("");
  const Navigate = useNavigate();

  // tostify message

  const submitFoem = (e) => {
    e.preventDefault();
    // console.log(name.length, email, password.length, phone, address);
    fetch("/api/v1/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        email: email,
        password: password,
        phone: phone,
        answer: answer,
        address: address,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((d) => {
        if (d.success) {
          toast.success(d.message);
          // console.log(d);
          Navigate("/login");
        } else {
          toast.error(d.message);
        }
      });
  };

  return (
    <>
      <Wrapper>
        <div className="formcontainer">
          <form>
            <h2>Sign UP </h2>
            <div className="mydiv">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="username"
                id="name"
                placeholder="Your Name"
                onChange={(e) => setname(e.target.value)}
                value={name}
                required={true}
              />
            </div>
            <div className="mydiv">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                onChange={(event) => setemail(event.target.value)}
                value={email}
              />
            </div>
            <div className="mydiv">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter a password"
                autoComplete="off"
                onChange={(event) => setpassword(event.target.value)}
                value={password}
              />
            </div>
            <div className="mydiv">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="Phone"
                id="phone"
                placeholder="Enter a Phone NO"
                onChange={(event) => setphone(event.target.value)}
                value={phone}
              />
            </div>
            <div className="mydiv">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Enter Your Address"
                onChange={(event) => setaddress(event.target.value)}
                value={address}
              />
            </div>
            <div className="mydiv">
              <label className="ans" htmlFor="answer">
                What is Your Favourite Language?
              </label>
              <input
                type="text"
                name="answer"
                id="answer"
                placeholder="Enter Your Answer"
                onChange={(event) => setanswer(event.target.value)}
                value={answer}
              />
              <p className="anstext">Help For Forgot password</p>
            </div>
            <div className="mydiv">
              <input
                type="submit"
                value="Register"
                className="btn"
                onClick={(e) => {
                  submitFoem(e);
                }}
              />
            </div>
            <Link style={{ textDecoration: "none" }} to="/login">
              <span className="text">Already have account?</span>
            </Link>
          </form>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff4f1;

  .formcontainer {
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 290px;
    border-radius: 10px;

    h2 {
      text-align: center;
      color: #ff7722;
    }

    .mydiv {
      margin: 18px 0;
      width: 250px;

      label {
        display: block;
        font-size: 18px;
      }
      .ans {
        font-size: 14px;
      }
      .anstext {
        margin-top: 3px;
        font-size: 10px;
        text-align: right;
      }
      input {
        width: 100%;
        margin-top: 3px;
        padding: 6px 9px;
      }

      .btn {
        background-color: #ff7722;
        padding: 7px 9px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        border: none;
        color: #fff;
        font-size: 17px;
        cursor: pointer;
      }
    }
    .text {
      font-size: 16px;
      color: #ff7722;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        color: #0a0a0a;
      }
    }
  }
`;
