import React from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import NewProduct from "./components/NewProduct";
import EditProduct from "./components/EditProduct";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Redux
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <div className="container mt-5">
          <Routes>
            <Route exact path="/" element={<Products />} />
            <Route excat path="/product/new" element={<NewProduct />} />
            <Route excat path="/product/edit/:id" element={<EditProduct />} />
          </Routes>
        </div>
      </Provider>
    </Router>
  );
}

export default App;

//para ejecutar la bd: npx json-server .\db.json --port 4000
//312 queda ver
