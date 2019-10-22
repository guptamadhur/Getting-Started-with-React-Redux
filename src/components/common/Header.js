import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/products" activeStyle={activeStyle}>
        Products
      </NavLink>
      {" | "}
      <NavLink to="/product" activeStyle={activeStyle}>
        Add Product
      </NavLink>
      {" | "}
      <NavLink to="/cart" activeStyle={activeStyle}>
        Cart
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
    </nav>
  );
};

export default Header;
