import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/home/";

export function getProducts() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function addSingleProduct(product) {
  console.log("Add Product To Cart" + product.name);
  return
}

export function removeProductFromCart(product) {
  console.log("Delete Product To Cart" + product.name);
  return;
}
