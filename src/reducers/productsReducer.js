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
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_EDIT_ERROR,
} from "../types";

// cada reducer tiene su propio state
const initialState = {
  products: [],
  error: null,
  loading: false,
  removeproduct: null,
  productedit: null,
};

export default function a(state = initialState, action) {
  switch (action.type) {
    case START_PRODUCTS_DOWNLOAD:
    case ADD_PRODUCT:
      return {
        ...state,
        loading: action.payload,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      };
    case ADD_PRODUCT_ERROR:
    case PRODUCTS_DOWNLOAD_ERROR:
    case PRODUCT_REMOVED_ERROR:
    case PRODUCT_EDIT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PRODUCTS_DOWNLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };
    case GET_PRODUCT_REMOVE:
      return {
        ...state,
        removeproduct: action.payload,
      };
    case PRODUCT_REMOVED_SUCCESS:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== state.removeproduct
        ),
        removeproduct: null,
      };
    case GET_PRODUCT_EDIT:
      return {
        ...state,
        productedit: action.payload,
      };
    case PRODUCT_EDIT_SUCCESS:
      return {
        ...state,
        productedit: null,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? (product = action.payload)
            : product
        ),
      };

    default:
      return state;
  }
}
