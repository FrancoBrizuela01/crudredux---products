import React from "react";
import Header from "./components/Header";
import Product from "./components/Product";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewProduct from "./components/NewProduct";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-5">
        <Routes>
          <Route exact path="/" element={<Product />} />
          <Route excat path="/product/new" element={<NewProduct />} />
          <Route excat path="/product/edit/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


//para ejecutar la bd: npx json-server .\db.json --port 4000
//ver 295 queda ver