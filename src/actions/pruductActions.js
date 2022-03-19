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
  GET_PRODUCT_EDIT,
  START_PRODUCT_EDIT,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_EDIT_ERROR,
} from "../types";
import clientAxios from "../config/axios";
import Swal from "sweetalert2";
import { type } from "@testing-library/user-event/dist/type";

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

//colocar producto en edicion
export function getProductEdit(product) {
  return (dispatch) => {
    dispatch(getProductEditAction(product));
  };
}

const getProductEditAction = (product) => ({
  type: GET_PRODUCT_EDIT,
  payload: product,
});

//edita un producto en la api y state
export function editProductAction(product) {
  return async (dispatch) => {
    dispatch(editProduct());

    try {
      await clientAxios.put(`/products/${product.id}`, product);
      dispatch(editProductSuccess(product));
    } catch (error) {
      dispatch(editProductError());
    }
  };
}

const editProduct = () => ({
  type: START_PRODUCT_EDIT,
});

const editProductSuccess = (product) => ({
  type: PRODUCT_EDIT_SUCCESS,
  payload: product,
});

const editProductError = () => ({
  type: PRODUCT_EDIT_ERROR,
  payload: true,
});
