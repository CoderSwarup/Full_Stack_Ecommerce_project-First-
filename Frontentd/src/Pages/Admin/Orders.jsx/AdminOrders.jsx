import React, { useEffect, useState } from "react";
import AdminDashboard from "../AdminDashboard";
import AdminMenu from "../../../Components/AdminMenu";
import { useAuth } from "../../../Context/AuthContext";
import axios from "axios";
import { styled } from "styled-components";
import ProductList from "../../../Components/ProductsList";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
export default function AdminOrders() {
  const [allorder, setallorders] = useState([]);
  const [status, setstatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Deliverd",
    "Cancel",
  ]);
  const [chageStatus, setchangestatus] = useState("");
  const [auth] = useAuth();
  const [selectdisabel, setdisable] = useState(false);

  ///get all orders
  const getAllOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/all-orders", {
        headers: {
          Authorization: auth?.token,
        },
      });
      //   console.log(data);
      setallorders(data);
    } catch (error) {
      console.log(error);
    }
  };

  //update status
  const handelChangeStatus = async (stat, order_id) => {
    try {
      //   console.log(stat, order_id);
      setdisable(true);
      const { data } = await axios.put(
        `/api/v1/order-status/${order_id}`,
        { status: stat },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      getAllOrders();
      setdisable(false);
      if (data) {
        toast.success("Status Updated Succefully");
      } else {
        toast.error("Status Not Updated");
      }
      //   log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <AdminMenu>
      <Orders>
        <h1>Your Orders</h1> {chageStatus}
        <MyTable>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Status</th>
              <th scope="col">Buyer</th>
              <th scope="col">Date</th>
              <th scope="col">Payment</th>
              <th scope="col">Quantity</th>
              <th scope="col">Products</th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
            {allorder?.map((data, i) => {
              const timestamp = new Date(`${data.createdAt}`);
              const options = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              };
              const dateTimeString = timestamp.toLocaleString(
                undefined,
                options
              );
              return (
                <tr style={{ margin: "20px", padding: "20px" }} key={i}>
                  <td>{i + 1}</td>
                  <td
                    style={{
                      color: `${
                        data.status == "Cancel"
                          ? "red"
                          : ` ${
                              data.status == "Deliverd" ? "green" : "black"
                            }  `
                      }`,
                    }}
                  >
                    <>
                      {data?.status == "Deliverd" ? (
                        <h3>Product Delivered </h3>
                      ) : (
                        <select
                          name=""
                          id=""
                          disabled={selectdisabel == true ? true : false}
                          onChange={(event) => {
                            event.preventDefault();
                            const val = event.target.value; // Extract the selected value
                            handelChangeStatus(val, data._id);
                          }}
                        >
                          <option value={data.status}>{data.status}</option>
                          {status.map((val, i) => {
                            return (
                              <option key={i} value={val}>
                                {val}
                              </option>
                            );
                          })}
                        </select>
                      )}
                    </>
                  </td>
                  <td>{data.buyer.username}</td>
                  <td>{dateTimeString}</td>
                  <td>
                    {data.payment.success ? "Completed" : "Not Completed"}
                  </td>
                  <td>{data.products.length}</td>
                  <td>
                    {data.products?.map((p, i) => {
                      return (
                        <p className="pdata" key={i}>
                          {i + 1} : {p.name}
                          <Link
                            style={{ textDecoration: "none", color: "#3a00c3" }}
                            to={`/product/${p.slug}`}
                          >
                            (Link)
                          </Link>
                        </p>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </MyTable>
      </Orders>
    </AdminMenu>
  );
}
const Orders = styled.div`
  padding: 20px;
  background: #ffedd8;
  width: 100%;
  min-height: 80vh;
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
