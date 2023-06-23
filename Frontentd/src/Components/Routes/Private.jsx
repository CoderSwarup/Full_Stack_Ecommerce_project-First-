import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { styled } from "styled-components";

export default function Private() {
  const [ok, setok] = useState(false);
  const [auth, setauth] = useAuth();

  const [count, setcount] = useState(5);
  const Navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (ok == false) {
      const interval = setInterval(() => {
        setcount((prev) => {
          return --prev;
        });

        count == 0 &&
          Navigate("/login", {
            state: location.pathname,
          });

        return clearInterval(interval);
      }, 1000);
    }
  }, [count, Navigate, location, auth]);

  useEffect(() => {
    const authcheck = async () => {
      const res = await fetch("/api/v1/user-auth", {
        method: "GET",
        headers: {
          Authorization: auth?.token,
        },
      });

      const data = await res.json();
      if (data.ok) {
        setok(true);
      } else {
        setok(false);
      }
    };

    if (auth?.token) authcheck();
  }, [auth?.token]);

  return ok ? (
    <Outlet> </Outlet>
  ) : (
    <Spinner>
      <h2>Redirect On Another Page In {count} Seconds</h2>
      <img src="./loading.gif" alt="Loading" />
    </Spinner>
  );
}

const Spinner = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h2 {
    font-size: 17px;
    color: #f59611;
  }

  img {
    width: 80px;
  }
`;
