import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import * as productActions from "../../redux/actions/productActions";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

class CartPage extends React.Component {
  componentDidMount() {
    const { products, actions } = this.props;
    if (products.length === 0) {
      actions.loadCartProduct().catch(error => {
        alert("Loading products failed" + error);
      });
    }
  }

  handleAdd = product => {
    toast.success(product.name + " Product Add");
    let addProductQTY = { ...product, quantity: product.quantity + 1 };
    this.props.actions.addQTY(addProductQTY);
  };

  handleRemove = product => {
    toast.warn(product.name + " Product Remove");
    let removeProductQTY = { ...product, quantity: product.quantity - 1 };
    this.props.actions.removeQTY(removeProductQTY);
  };

  totalCount() {
    return this.props.products
      .filter(item => item.quantity > 0)
      .map(item => item.quantity * item.price)
      .reduce((prev, curr) => prev + curr, 0);
  }

  render() {
    return (
      <>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <div className="container mb-4">
            <div className="row">
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col"> </th>
                        <th scope="col">Product Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.products
                        .filter(product => product.quantity > 0)
                        .map(product => {
                          return (
                            <tr key={product.id}>
                              <td>
                                {product.image != "" ? (
                                  <img
                                    width="42"
                                    height="42"
                                    alt="product.name.substring(0, 1)"
                                    src={product.image}
                                  />
                                ) : (
                                  <div>{product.name.substring(0, 1)}</div>
                                )}
                              </td>
                              <td>{product.name}</td>
                              <td>{product.description}</td>
                              <td>{product.price}</td>

                              <div>
                                {product.quantity > 0 ? (
                                  <button
                                    style={{}}
                                    className="mr-1 btn btn-secondary btn-sm"
                                    onClick={() => this.handleRemove(product)}
                                  >
                                    -
                                  </button>
                                ) : (
                                  ""
                                )}
                                {product.quantity > 0 ? (
                                  <span className="mr-3 ml-3">
                                    {product.quantity} in basket
                                  </span>
                                ) : (
                                  ""
                                )}
                                <button
                                  style={{}}
                                  className="mr-1 btn btn-secondary btn-sm"
                                  onClick={() => this.handleAdd(product)}
                                >
                                  +
                                  {product.quantity == 0 ? (
                                    <span> Add</span>
                                  ) : (
                                    ""
                                  )}
                                </button>
                              </div>
                            </tr>
                          );
                        })}
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Sub-Total</td>
                        <td className="text-right">{this.totalCount()} INR</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Shipping</td>
                        <td className="text-right">100 INR</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <strong>Total</strong>
                        </td>
                        <td className="text-right">
                          <strong>{this.totalCount() + 100} INR</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col mb-2">
                <div className="row">
                  <div className="col-sm-12  col-md-6">
                    <button className="btn btn-block btn-light">
                      <Link to={"/"}>Continue Shopping</Link>
                    </button>
                  </div>
                  <div className="col-sm-12 col-md-6 text-right">
                    <button className="btn btn-lg btn-block btn-success text-uppercase">
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

CartPage.propTypes = {
  products: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    products: state.products,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCartProduct: bindActionCreators(
        productActions.loadCartProducts,
        dispatch
      ),
      addQTY: bindActionCreators(productActions.addQuantity, dispatch),
      removeQTY: bindActionCreators(productActions.removeQuantity, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartPage);
