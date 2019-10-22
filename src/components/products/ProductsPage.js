import React from "react";
import { connect } from "react-redux";
import * as productActions from "../../redux/actions/productActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import ProductList from "./ProductList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class ProductsPage extends React.Component {
  state = {
    redirectToAddProductPage: false
  };

  componentDidMount() {
    const { products, actions } = this.props;
    if (products.length === 0) {
      actions.loadProducts().catch(error => {
        alert("Loading products failed" + error);
      });
    }
  }

  handleDeleteProduct = async product => {
    toast.success("Product deleted");
    try {
      await this.props.actions.deleteProduct(product);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddProductPage && <Redirect to="/product" />}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <div className="row">
              <h3 className="col-md-10">View Products</h3>
              <button
                style={{background: "#FF9700" }}
                className="ml-5 mb-2 btn btn-primary roundBtn"
                onClick={() =>
                  this.setState({ redirectToAddProductPage: true })
                }
              >
                Add Product
              </button>
            </div>

            <ProductList
              onDeleteClick={this.handleDeleteProduct}
              products={this.props.products}
            />
          </>
        )}
      </>
    );
  }
}

ProductsPage.propTypes = {
  products: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    products: state.products,
    id: state.id,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProducts: bindActionCreators(productActions.loadProducts, dispatch),
      deleteProduct: bindActionCreators(productActions.deleteProduct, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsPage);
