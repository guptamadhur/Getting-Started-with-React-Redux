import * as types from "./actionTypes";
import * as productApi from "../../api/productApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadProductSuccess(products) {
  return { type: types.LOAD_PRODUCTS_SUCCESS, products };
}

export function createProductSuccess(product) {
  return { type: types.CREATE_PRODUCT_SUCCESS, product };
}

export function updateProductSuccess(product) {
  return { type: types.UPDATE_PRODUCT_SUCCESS, product };
}

export function deleteProductOptimistic(product) {
  return { type: types.DELETE_PRODUCT_OPTIMISTIC, product };
}

export function addQuantitySuccess(product) {
  return { type: types.ADD_QUANTITY_SUCCESS, product };
}

export function removeQuantitySuccess(product) {
  return { type: types.REMOVE_QUANTITY_SUCCESS, product };
}

export function loadCartProductSuccess(products) {
  return { type: types.LOAD_CART_PRODUCTS_SUCCESS, products };
}

export function loadProducts() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return productApi
      .getProducts()
      .then(products => {
        dispatch(loadProductSuccess(products));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function loadCartProducts() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return productApi
      .getProducts()
      .then(products => {
        dispatch(loadProductSuccess(products));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveProduct(product) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return productApi
      .saveProduct(product)
      .then(savedProduct => {
        product.id
          ? dispatch(updateProductSuccess(savedProduct))
          : dispatch(createProductSuccess(savedProduct));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function addQuantity(product) {
  console.log("product: ", product);
  return function(dispatch, getState) {
    return productApi
      .saveProduct(product)
      .then(dispatch(addQuantitySuccess(product)))
      .catch(error => {
        dispatch();
        throw error;
      });
  };
}

export function removeQuantity(product) {
  console.log("product: ", product);
  return function(dispatch, getState) {
    return productApi
      .saveProduct(product)
      .then(dispatch(removeQuantitySuccess(product)))
      .catch(error => {
        dispatch();
        throw error;
      });
  };
}

export function deleteProduct(product) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteProductOptimistic(product));
    return productApi.deleteProduct(product.id);
  };
}
