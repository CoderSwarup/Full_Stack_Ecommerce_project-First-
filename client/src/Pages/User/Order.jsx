import React, { useEffect, useState } from "react";
import UserMenu from "../../Components/UserMenu";
import { styled } from "styled-components";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import ProductList from "../../Components/ProductsList";
import { Link } from "react-router-dom";
export default function Order() {
  const [order, setorders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/orders", {
        headers: {
          Authorization: auth?.token,
        },
      });
      console.log(data);
      setorders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <UserMenu>
      <Orders>
        <h1>Your Orders</h1>

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
            {order?.map((data, i) => {
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
                    {data.status}
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
    </UserMenu>
  );
}

const Orders = styled.div`
  padding: 20px;
  background: #ffedd8;
  width: 100%;
  min-height: 80vh;
  overflow-x: auto;

  -webkit-overflow-scrolling: touch;
`;

const MyTable = styled.table`
  width: 100%;
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
