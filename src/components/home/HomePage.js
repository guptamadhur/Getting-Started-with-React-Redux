import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CartList from "../products/Card/CardList";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import * as cartActions from "../../redux/actions/cartActions";
import * as productActions from "../../redux/actions/productActions";
import { bindActionCreators } from "redux";

class HomePage extends React.Component {
  componentDidMount() {
    const { products, actions } = this.props;
    if (products.length === 0) {
      actions.loadProducts().catch(error => {
        alert("Loading products failed" + error);
      });
    }
  }

  handleAdd = product => {
    toast.success(product.name + " Product Remove");
    this.props.actions.addProduct(product);
    //console.log("addedItems",this.props.addedItems);
  };

  handleRemove = product => {
    toast.warn(product.name + " Product Remove");
    this.props.actions.removeProduct(product);
  };

  render() {
    return (
      <>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <div className="row shadow p-2 mb-4 bg-danger font-weight-bold text-center">
              Home | Cart({this.total})
            </div>
            <div className="shadow-sm p-4 mb-4 bg-white">
              <CartList
                products={this.props.products}
                onAddClick={this.handleAdd}
                onRemoveClick={this.handleRemove}
              />
            </div>
          </>
        )}
      </>
    );
  }
}

HomePage.propTypes = {
  products: PropTypes.array.isRequired,
  total:PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    products: state.products,
    total:state.cart.total,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProducts: bindActionCreators(productActions.loadProducts, dispatch),
      addProduct: bindActionCreators(
        cartActions.addProductToCartAction,
        dispatch
      ),
      removeProduct: bindActionCreators(
        cartActions.removeProductFromCartAction,
        dispatch
      )
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
