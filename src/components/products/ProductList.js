import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductList = ({ products, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Image</th>
        <th>Product Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Unit Of Measurement</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {products.map(product => {
        return (
          <tr key={product.id}>
            <td>
              <a
                className="btn btn-light font-weight-bold"
                href={"/product/" + product.slug}
              >
                {product.image != "" ? (
                  <img src={product.image} width="42" height="42" />
                ) : (
                  product.name.substring(0, 1)
                )}
              </a>
            </td>
            <td>
              <Link to={"/product/" + product.slug}>{product.name}</Link>
            </td>
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td>{product.unit}</td>
            <td>
              <Link to={"/product/" + product.slug}>
                <button
                  style={{}}
                  className="pr-3 pl-3 btn btn-outline-info roundBtn"
                >
                  Edit
                </button>
              </Link>
              <button
                style={{}}
                className="ml-2 pr-3 pl-3 btn btn-outline-info roundBtn"
                onClick={() => onDeleteClick(product)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default ProductList;
