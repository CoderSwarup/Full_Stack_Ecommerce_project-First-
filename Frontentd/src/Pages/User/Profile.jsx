import React, { useEffect, useState } from "react";
import UserMenu from "../../Components/UserMenu";
import { styled } from "styled-components";
import { useAuth } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
export default function Profile() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [answer, setanswer] = useState("");
  const Navigate = useNavigate();
  const [auth, setauth] = useAuth();

  const UpdateProdilehandler = async () => {
    try {
      const { data } = await axios.put(
        "/api/v1/update-profile",
        { name, phone, address },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      // console.log(data);
      if (data?.success) {
        setauth({ ...auth, user: data?.updateuser });
        let local_user = localStorage.getItem("auth");
        local_user = JSON.parse(local_user);
        local_user.user = data.updateuser;
        // console.log(local_user);
        localStorage.setItem("auth", JSON.stringify(local_user));
        toast.success(data.message);
      } else {
        toast.error(data?.message || "Error in Updating Profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const user = auth?.user;
    // console.log(user);
    setname(user.username);
    setemail(user.email);
    setaddress(user.address);
    setphone(user.phone);
  }, []);
  return (
    <UserMenu>
      <Wrapper>
        <h1>{auth?.user?.username} Profile </h1>
        {/* {JSON.stringify(auth, null, 2)} */}
        <SignUPForm>
          <div className="formcontainer">
            <form>
              <h2>PROFILE</h2>
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
                  disabled
                />
              </div>
              {/* <div className="mydiv">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter a password"
                  autoComplete="off"
                  onChange={(event) => setpassword(event.target.value)}
                  value={password}
                  disabled
                />
              </div> */}
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
                <input
                  type="submit"
                  value="Update Profile"
                  className="btn"
                  onClick={(e) => {
                    e.preventDefault();
                    UpdateProdilehandler();
                  }}
                />
              </div>
            </form>
          </div>
        </SignUPForm>
      </Wrapper>
    </UserMenu>
  );
}

const Wrapper = styled.div`
  background: #fff4f1;
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const SignUPForm = styled.div`
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
