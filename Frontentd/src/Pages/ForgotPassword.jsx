import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";
export default function ForgotPassword() {
  const [email, setemail] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [answer, setanswer] = useState("");
  const Navigate = useNavigate();

  const [auth, setauth] = useAuth();
  const location = useLocation();

  const LoginHandler = (e) => {
    e.preventDefault();

    fetch("/api/v1/forgotpassword", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        answer,
        newpassword,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((d) => {
        // console.log(d);
        if (d.success) {
          toast.success(d.message);

          //Get the login user Data And Token to store into the data base
          setauth({
            ...auth,
            user: d.user,
            token: d.token,
          });

          //store the data into local storage
          localStorage.setItem("auth", JSON.stringify(d));
          //   console.log(d);
          Navigate(location.state || "/");
        } else {
          toast.error(d.message);
        }
      });
  };
  return (
    <Wrapper>
      <div className="formcontainer">
        <form action="">
          <h2>FORGOT PASSWORD</h2>
          <div className="mydiv">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="ename"
              id="ename"
              placeholder="Your Email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
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
          </div>
          <div className="mydiv">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter a password"
              autoComplete="off"
              onChange={(e) => setnewpassword(e.target.value)}
              value={newpassword}
            />
          </div>
          <div className="mydiv">
            <input
              type="submit"
              value="Reset Password"
              className="btn"
              onClick={(e) => LoginHandler(e)}
            />
          </div>
        </form>
      </div>
    </Wrapper>
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
    padding: 15px;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 280px;

    h2 {
      text-align: center;
      color: #ff7722;
    }

    .mydiv {
      margin: 18px 0;
      width: 250px;

      label {
        display: block;
        font-size: 17px;
      }
      .anstext {
        margin-top: 3px;
        font-size: 13px;
        text-align: right;
        color: #0a0a0a;
        cursor: pointer;
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
