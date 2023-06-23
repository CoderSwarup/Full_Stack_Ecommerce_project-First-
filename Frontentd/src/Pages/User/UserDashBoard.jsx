import React from "react";
import UserMenu from "../../Components/UserMenu";
import { useAuth } from "../../Context/AuthContext";

export default function UserDashBoard() {
  const [auth] = useAuth();
  // console.log(auth.user);

  return (
    <>
      <UserMenu>
        <h1>{auth?.user?.usename}</h1>
        <h1>{auth?.user?.email}</h1>
        <h1>{auth?.user?.phone}</h1>
      </UserMenu>
    </>
  );
}
