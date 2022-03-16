import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  START_PRODUCTS_DOWNLOAD,
  PRODUCTS_DOWNLOAD_SUCCESS,
  PRODUCTS_DOWNLOAD_ERROR,
  GET_PRODUCT_REMOVE,
  PRODUCT_REMOVED_SUCCESS,
  PRODUCT_REMOVED_ERROR,
} from "../types";
import clientAxios from "../config/axios";
import Swal from "sweetalert2";

//Crear nuevos productos
export function createNewProductAction(product) {
  return async (dispatch) => {
    dispatch(addProduct());
    try {
      //insertar en la API
      await clientAxios.post("/products", product);
      //si todo sale bien, actualizar el state
      dispatch(addProductSuccess(product));

      //alerta
      Swal.fire("Good job!", "the product was added correctly", "success");
    } catch (error) {
      console.log(error);
      //si hay un error cambiar el state
      dispatch(addProductError(true));

      Swal.fire({
        icon: "error",
        tittle: "There was a mistake",
        text: "There was a mistake, try again",
      });
    }
  };
}

const addProduct = () => ({
  type: ADD_PRODUCT,
  payload: true,
});

//si el producto se guarda en la bd
const addProductSuccess = (product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
});

//si hibo un error
const addProductError = (state) => ({
  type: ADD_PRODUCT_ERROR,
  payload: state,
});

//funcion que descarga los productos de la bd
export function getProductsAction() {
  return async (dispatch) => {
    dispatch(downloadProducts());
    try {
      setTimeout(async () => {
        const answer = await clientAxios.get("/products");
        dispatch(downloadProductSuccess(answer.data));
      }, 2000);
    } catch (error) {
      dispatch(downloadProductError());
    }
  };
}

const downloadProducts = () => ({
  type: START_PRODUCTS_DOWNLOAD,
  payload: true,
});

const downloadProductSuccess = (products) => ({
  type: PRODUCTS_DOWNLOAD_SUCCESS,
  payload: products,
});

const downloadProductError = () => ({
  type: PRODUCTS_DOWNLOAD_ERROR,
  payload: true,
});

//selecciona y elimina el producto
export function deleteProductAction(id) {
  return async (dispatch) => {
    dispatch(getProductRemove(id));
    try {
      await clientAxios.delete(`/products/${id}`);
      dispatch(removeProductSuccess());
      //si se elimina mostrar alerta
      Swal.fire("Deleted!", "Your file has been deleted.", "success"); 
    } catch (error) {
      dispatch(removeProductError());
    }
  };
}

const getProductRemove = (id) => ({
  type: GET_PRODUCT_REMOVE,
  payload: id,
});

const removeProductSuccess = () => ({
  type: PRODUCT_REMOVED_SUCCESS,
});

const removeProductError = () => ({
  type: PRODUCT_REMOVED_ERROR,
  payload: true,
});
