import React, { useState } from "react";
import { styled } from "styled-components";
import { useAuth } from "../../../Context/AuthContext";
import toast from "react-hot-toast";

export default function CreateCat({ getAllCategory }) {
  const [catname, setcatname] = useState("");
  const [auth] = useAuth();

  const createCategory = (e) => {
    e.preventDefault();
    fetch("/api/v1/category/create-category", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify({
        name: catname,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        if (data.sucess) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        getAllCategory();
        setcatname("");
      });
  };

  return (
    <CretaCat>
      <form>
        <input
          onChange={(e) => {
            setcatname(e.target.value);
          }}
          type="text"
          placeholder=" Eneter Category name"
          value={catname}
        ></input>
        <button onClick={(e) => createCategory(e)}>Create Category</button>
      </form>
    </CretaCat>
  );
}

const CretaCat = styled.div`
  margin: 15px 0;

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    input {
      padding: 5px 10px;
      font-size: 18px;
    }

    button {
      padding: 5px;
      border-radius: 8px;
      border: 1px solid #000;
      background-color: #ff7300;
      color: #ffff;
      font-size: 18px;
      cursor: pointer;
    }
  }
`;
