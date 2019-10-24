import { handleResponse, handleError } from "./apiUtils";
import axios from "axios";
const mode = process.env.NODE_ENV;

const baseUrl =  mode == "local" ? process.env.API_URL : process.env.API_URL_SERVER;
// const baseUrl=process.env.API_URL;

export function getProducts() {
  return fetch(baseUrl + `/products/`)
    .then(handleResponse)
    .catch(handleError);
}

export function saveProduct(product) {
  return fetch(baseUrl + `/products/` + (product.id || ""), {
    method: product.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(product)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteProduct(productId) {
  debugger;
  return fetch(baseUrl + `/products/` + productId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
