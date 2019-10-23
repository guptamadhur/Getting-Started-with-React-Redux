export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const LOAD_PRODUCTS_SUCCESS = "LOAD_PRODUCTS_SUCCESS";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const BEGIN_API_CALL = "BEGIN_API_CALL";
export const API_CALL_ERROR = "API_CALL_ERROR";

// By convention, actions that end in "_SUCCESS" are assumed to have been the result of a completed
// API call. But since we're doing an optimistic delete, we're hiding loading state.
// So this action name deliberately omits the "_SUCCESS" suffix.
// If it had one, our apiCallsInProgress counter would be decremented below zero
// because we're not incrementing the number of apiCallInProgress when the delete request begins.
export const DELETE_PRODUCT_OPTIMISTIC = "DELETE_PRODUCT_OPTIMISTIC";

//Change to nesting
export const ADD_QUANTITY_SUCCESS = "ADD_QUANTITY_SUCCESS";
export const LOAD_CART_PRODUCTS_SUCCESS = "LOAD_CART_PRODUCTS_SUCCESS";
export const REMOVE_QUANTITY_SUCCESS = "REMOVE_QUANTITY_SUCCESS";
