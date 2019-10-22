import * as types from "./actionTypes";
import * as cartApi from "../../api/cartApi";

export function viewSuccess(cart) {
  return { type: types.VIEW_PRODUCT_IN_CART_SUCCESS, cart };
}

export function addSuccess(product) {
  return { type: types.ADD_TO_CART_SUCCESS, product };
}

export function updateSuccess(product) {
  return { type: types.UPDATE_ITEM_UNITS_SUCCESS, product };
}

export function removeSuccess(product) {
  return { type: types.REMOVE_PRODUCT_TO_CART_SUCCESS, product };
}

export function addProductToCartAction(product) {
  // debugger;
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    console.log("product: ", product);
    dispatch(addSuccess(product));
    return cartApi.addSingleProduct(product);
  };
}

export function removeProductFromCartAction(product) {
  return function(dispatch) {
    console.log("product: ", product);
    dispatch(removeSuccess(product));
    return cartApi.removeProductFromCart(product);
  };
}
