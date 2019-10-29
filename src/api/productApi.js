import { handleResponse, handleError } from "./apiUtils";
const mode = process.env.NODE_ENV;

const baseUrl =
  mode == "local" ? process.env.API_URL : process.env.API_URL_SERVER;
// const baseUrl=process.env.API_URL;

export function getProducts() {
  return fetch(baseUrl + `/product/all`)
    .then(handleResponse)
    .catch(handleError);
}

export function saveProduct(product) {
  debugger;
  return fetch(baseUrl + `/product`, {
    method: product.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(product)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteProduct(productId) {
  return fetch(baseUrl + `/product`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id: productId })
  })
    .then(handleResponse)
    .catch(handleError);
}
