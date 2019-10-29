import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadProducts, saveProduct } from "../../redux/actions/productActions";
import PropTypes from "prop-types";
import ProductForm from "./ProductForm";
import { newProduct } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

function ManageProductPage({
  products,
  loadProducts,
  saveProduct,
  history,
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (products.length === 0) {
      loadProducts().catch(error => {
        alert("Loading products failed" + error);
      });
    } else {
      setProduct({ ...props.product });
    }
  }, [props.product]);

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: name === "productId" ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const { name, unit, price } = product;
    const errors = {};

    if (!name) errors.name = "Product Name is required.";
    if (!unit) errors.unit = "Unit is required";
    if (!price) errors.price = "Price is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    product.slug = product.name;
    saveProduct(product)
      .then(() => {
        toast.success("Product saved.");
        history.push("/products");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return products.length === 0 ? (
    <Spinner />
  ) : (
    <ProductForm
      product={product}
      errors={errors}
      products={products}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageProductPage.propTypes = {
  product: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  loadProducts: PropTypes.func.isRequired,
  saveProduct: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getProductBySlug(products, slug) {
  return products.find(product => product.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const product =
    slug && state.products.length > 0
      ? getProductBySlug(state.products, slug)
      : newProduct;
  return {
    product,
    products: state.products
  };
}

const mapDispatchToProps = {
  loadProducts,
  saveProduct
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageProductPage);
