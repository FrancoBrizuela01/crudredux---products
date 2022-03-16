import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { deleteProductAction } from "../actions/pruductActions";

const Product = ({ product }) => {
  const { name, price, id } = product;

  const dispatch = useDispatch();
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
  return (
    <tr>
      <td>{name}</td>
      <td>
        <span className="font-weight-bold">$ {price}</span>
      </td>
      <td className="acciones">
        <Link to={`/product/edit/${id}`} className="btn btn-primary mr-2">
          Edit
        </Link>
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
