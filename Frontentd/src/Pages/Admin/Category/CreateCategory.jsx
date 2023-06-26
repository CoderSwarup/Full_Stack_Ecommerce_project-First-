import React, { useEffect, useState } from "react";
import AdminMenu from "../../../Components/AdminMenu";
import { styled } from "styled-components";
import CreateCat from "./CreateCat";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { useAuth } from "../../../Context/AuthContext";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
  },
};

Modal.setAppElement("#mymodel");

export default function CreateCategory() {
  const [auth] = useAuth();
  const [categories, setcategories] = useState([]);

  const [updatedname, setupdatedname] = useState("");
  const [catid, setcatid] = useState(null);

  //model
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  //model funcatinality end

  //fetching all category
  const getAllCategory = () => {
    fetch("/api/v1/category/get-category")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setcategories(data.category);
      });
  };

  // update category api
  const updateCategory = (event) => {
    event.preventDefault();
    // console.log(catid);

    fetch(`/api/v1/category/update-category/${catid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify({
        name: updatedname,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        closeModal();
        getAllCategory();
      });
  };

  //delete category api
  const deletecategory = async (e) => {
    e.preventDefault();
    let res = await fetch(`/api/v1/category/delete-category/${catid}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
    });
    let data = await res.json();
    // console.log(data);
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    getAllCategory();
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <AdminMenu>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Modal"
      >
        <Mymodel>
          <h1>Update Category</h1>
          <form action="">
            <input
              type="text"
              placeholder=" Eneter Category name"
              value={updatedname}
              onChange={(e) => {
                setupdatedname(e.target.value);
              }}
            ></input>
            <button
              onClick={(event) => {
                updateCategory(event);
              }}
            >
              Update Category
            </button>
          </form>
        </Mymodel>
      </Modal>
      <h2>All Categories</h2>
      <CreateCat getAllCategory={getAllCategory}></CreateCat>
      <CatTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category, i) => {
            return (
              <tr key={i}>
                <td>{category.name}</td>
                <td className="buttons">
                  <button
                    onClick={() => {
                      openModal();
                      setupdatedname(category.name);
                      setcatid(category._id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      setcatid(category._id);
                      deletecategory(e);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </CatTable>
    </AdminMenu>
  );
}

const CatTable = styled.table`
  /* border: 2px solid red; */
  width: 400px;
  /* background: red; */
  /* display: flex; */
  margin-top: 20px;

  tr {
    /* background-color: red; */
    border: 1px solid black;
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: 5px 0;
  }
  th {
    width: 100%;
    /* background-color: red; */
    border: 2px solid black;
    font-size: 20px;
  }
  td {
    width: 100%;
    text-align: center;
    border: 2px solid black;
    display: grid;
    place-items: ceneter;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    padding: 6px;
  }

  .buttons {
    display: flex;
    justify-content: space-around;
    align-items: center;

    button {
      background-color: #0000ff;
      color: #fff;
      font-size: 17px;
      padding: 3px 8px;
      font-weight: 800;
      letter-spacing: 1px;
      border: none;
      border-radius: 6px;

      &:nth-child(2) {
        background-color: red;
      }
    }
  }
`;

const Mymodel = styled.div`
  form {
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    input {
      padding: 5px 10px;
      font-size: 17px;
    }

    button {
      padding: 5px;
      border-radius: 8px;
      border: 1px solid #000;
      background-color: #ff7300;
      color: #ffff;
      font-size: 14px;
      cursor: pointer;
    }
  }
`;
