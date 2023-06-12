import React from "react";
import { useAuth } from "../Context/authContext";
export default function Home() {
  const [auth, setauth] = useAuth();
  return (
    <>
      <div>
        <h1>Home Page</h1>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
      </div>
    </>
  );
}
