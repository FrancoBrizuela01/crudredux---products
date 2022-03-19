import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { deleteProductAction, getProductEdit } from "../actions/pruductActions";

const Product = ({ product }) => {
  const { name, price, id } = product;

  const dispatch = useDispatch();
  const navigate = useNavigate(); //habilitar navigate para redireccion

  //confirmar si decea eliminarlo
  const confirmDeleteProduct = (id) => {
    //preguntar al usuario
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //pasarlo al action
        dispatch(deleteProductAction(id));
      }
    });
  };

  //funcion que rediridige de forma programada
  const redirectEdition = (product) => {
    dispatch(getProductEdit(product));
    navigate(`/product/edit/${product.id}`);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>
        <span className="font-weight-bold">$ {price}</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          onClick={() => redirectEdition(product)}
          className="btn btn-primary mr-2"
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmDeleteProduct(id)}
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default Product;
