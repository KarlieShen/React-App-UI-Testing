import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div style={{ margin: "20px" }}>
      <nav style={{ margin: "20px" }}>
        <ol style={{
          display: "flex",
          padding: "0",
          listStyle: "none",
        }}>
          <li>
            <Link to={"/"}>Login Form</Link>
          </li>
          <li style={{ marginLeft: "20px" }}>
            <Link to={"/cards"}>Card</Link>
          </li>
        </ol>
      </nav>
      <Outlet />
    </div>
  );
}
