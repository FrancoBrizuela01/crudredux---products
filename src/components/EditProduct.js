import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProductAction } from "../actions/pruductActions";
import { useNavigate } from "react-router-dom";

const EditProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //nuevo state de producto
  const [product, saveProduct] = useState({
    nombre: "",
    price: "",
  });

  //producto a editar
  const productedit = useSelector((state) => state.products.productedit);
  //   if (!product) return null;

  //lenar el state automaticamente
  useEffect(() => {
    saveProduct(productedit);
  }, [productedit]);

  //leer los datos del formulario
  const onChangeForm = (e) => {
    saveProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const { name, price } = product;

  const submitEditProduct = (e) => {
    e.preventDefault();
    dispatch(editProductAction(product));
    navigate("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">Edit Product</h2>
            <form onSubmit={submitEditProduct}>
              <div className="form-group">
                <label>Name Product</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name Product"
                  name="name"
                  value={name}
                  onChange={onChangeForm}
                />
              </div>
              <div className="form-group">
                <label>Price Product</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price Product"
                  name="price"
                  value={price}
                  onChange={onChangeForm}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
