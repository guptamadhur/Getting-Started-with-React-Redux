import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./card.css";

const CartList = ({ products, onAddClick, onRemoveClick }) => {
  return (
    <div className="grid-card-container">
      {products.map(product => {
        return (
          <div className="card shadow p-4 mb-4 bg-white" key={product.id}>
            {product.image != "" ? (
              <img
                className="card-img-top"
                alt={product.name.substring(0, 1)}
                src={product.image}
              />
            ) : (
              <div className="card-img-top">{product.name.substring(0, 1)}</div>
            )}
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">{product.price}</p>
            </div>
            <div className="card-body">
              {product.quantity > 0 ? (
                <button
                  style={{}}
                  className="mr-1 btn btn-secondary btn-sm"
                  onClick={() => onRemoveClick(product)}
                >
                  -
                </button>
              ) : (
                ""
              )}
              {product.quantity > 0 ? (
                <span className="mr-3 ml-3">{product.quantity} in basket</span>
              ) : (
                ""
              )}
              <button
                style={{}}
                className="mr-1 btn btn-secondary btn-sm"
                onClick={() => onAddClick(product)}
              >
                +{product.quantity == 0 ? <span> Add</span> : ""}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

CartList.propTypes = {
  products: PropTypes.array.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    state: state,
    products: state.products,
    loading: state.apiCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(CartList);
