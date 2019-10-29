import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CartList from "../products/Card/CardList";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
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
      .map(item => item.quantity)
      .reduce((prev, curr) => prev + curr, 0);
  }

  render() {
    return (
      <>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <div className="row shadow p-2 mb-4 bg-danger font-weight">
              Home | Cart({this.totalCount()})
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
      loadProducts: bindActionCreators(productActions.loadProducts, dispatch),
      addQTY: bindActionCreators(productActions.addQuantity, dispatch),
      removeQTY: bindActionCreators(productActions.removeQuantity, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
