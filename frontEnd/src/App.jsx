import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductList from './pages/ProductList';
import Register from "./pages/Register";
import Product from './pages/Product';
import Cart from './pages/Cart';
import Logout from "./pages/Logout";
import Checkout from "./pages/Checkout";
import SendMail from "./pages/SendMail";
import ProductListNoCategory from "./pages/ProductListNoCategory";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={ <Register />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/products" element={<ProductListNoCategory />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/sendmail" element={<SendMail />} />
      </Routes>
  </BrowserRouter>
  );
};

export default App;
