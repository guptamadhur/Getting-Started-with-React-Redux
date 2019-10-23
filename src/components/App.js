import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import CartPage from "./cart/CartPage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import ProductsPage from "./products/ProductsPage";
import ManageProductPage from "./products/ManageProductPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/product/:slug" component={ManageProductPage} />
        <Route path="/product" component={ManageProductPage} />
        <Route path="/cart" component={CartPage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
