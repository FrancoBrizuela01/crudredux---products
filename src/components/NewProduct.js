import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//Actions de Redux
import { createNewProductAction } from "../actions/pruductActions";
import { showAlert, hideAlertAction } from "../actions/alertActions";

const NewProduct = ({ history }) => {
  //redireccionar
  let navigate = useNavigate();

  //state del componente
  const [name, saveName] = useState("");
  const [price, savePrice] = useState(0);

  //utilizar use dispatch y te crea una funcion
  const dispatch = useDispatch();

  //acceder al state del store
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const alert = useSelector((state) => state.alert.alert);

  //mandar a llamar el action de productAction
  const addProduct = (product) => dispatch(createNewProductAction(product));

  //cuando el usuario haga submit
  const submitNewProduct = (e) => {
    e.preventDefault();

    //validar formulario
    if (name.trim() === "" || price <= 0) {
      const alert = {
        msg: "Both fields are required",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(showAlert(alert));
      return;
    }

    //si no hay errores
    dispatch(hideAlertAction());

    //crear el nuevo producto
    addProduct({
      name,
      price,
    });

    //redireccionar
    navigate("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Add New Product
            </h2>
            {alert ? <p className={alert.classes}>{alert.msg}</p> : null}
            <form onSubmit={submitNewProduct}>
              <div className="form-group">
                <label>Name Product</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name Product"
                  name="name"
                  value={name}
                  onChange={(e) => saveName(e.target.value)}
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
                  onChange={(e) => savePrice(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Add
              </button>
            </form>
            {loading ? <p>Loading..</p> : null}
            {error ? (
              <p className="alert alert-danger p2 mt-4 text-center">
                There was a mistake
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
