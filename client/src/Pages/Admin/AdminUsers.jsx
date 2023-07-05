import React, { useEffect, useState } from "react";
import AdminMenu from "../../Components/AdminMenu";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import { styled } from "styled-components";

export default function AdminUsers() {
  const [users, setusers] = useState([]);
  const [auth] = useAuth();

  const getallUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/all-users", {
        headers: {
          Authorization: auth?.token,
        },
      });
      // console.log(data.users);
      setusers(data?.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getallUsers();
  }, []);
  return (
    <AdminMenu>
      <Data>
        <h1>All Users</h1>

        <MyTable>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone No</th>
              <th scope="col">Address</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>{user.role == 1 ? "Admin" : "User"}</td>
                </tr>
              );
            })}
          </tbody>
        </MyTable>
      </Data>
    </AdminMenu>
  );
}

const Data = styled.div`
  width: 100%;
  background: #ffdfb8;
  padding: 10px;

  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

const MyTable = styled.table`
  width: 95%;
  margin: auto;
  border-collapse: collapse;
  text-align: center;

  font-size: 17px;

  th,
  td {
    padding: 10px;
    border: 3px dotted orange;
  }

  .pdata {
    text-align: left;
    margin: 5px 0;
  }
`;
