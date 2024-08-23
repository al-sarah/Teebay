import "./styles.css";
import './App.css';
import Login from "./components/Login";
import Signup from "./components/SignUp";
import ProductView from "./components/productView";
import { Route, Routes } from "react-router-dom";
import ProductTitle from "./components/ProductTitle";
import ProductCategory from "./components/productCategory";
import ProductDescription from "./components/ProductDescription";
import ProductPrice from "./components/productPrice";
import ProductSummary from "./components/productSummary";
import { FormProvider } from "./components/Formcontext.js";
import ProductEdit from "./components/productEdit.jsx";


function App() {
  return (
    <FormProvider>
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/:id/products" element={<ProductView />} />
        <Route path="/create_products/title" element={<ProductTitle />} />
        <Route path="/create_products/category" element={<ProductCategory />} />
        <Route path="/create_products/description" element={<ProductDescription />} />
        <Route path="/create_products/price" element={<ProductPrice />} />
        <Route path="/create_products/summary" element={<ProductSummary />} />
        <Route path="/products/:id/edit" element={<ProductEdit />} />
      </Routes>
    </div>
  </FormProvider>
  );
}

export default App;
