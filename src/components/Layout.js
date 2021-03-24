import React from "react";
import Home from "./Home";

const Layout = (props) => {
  return (
    <div>
      <Home />
      {props.children}
    </div>
  );
};
export default Layout;
