import * as types from "../actions/actionTypes";
import initialState from "./initialState";

const cartReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.VIEW_PRODUCT_IN_CART_SUCCESS:
      return;
    case types.ADD_TO_CART_SUCCESS: {
      action.product.quantity += 1;
      return state;
    }
    case types.REMOVE_PRODUCT_TO_CART_SUCCESS: {
      console.log("action: ", action);
      action.product.quantity -= 1;
      // const index = state.map(item => item.id).indexOf(action.product.id);
      // const stateTemp = [...state.slice(0, index), ...state.slice(index + 1)];
      return 
    }

    default:
      return state;
  }
};

export default cartReducer;
