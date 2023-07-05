import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import PageNotFound from "./Pages/PageNotFound";
import SEO from "./Components/SEO";
import SignUP from "./Pages/SignUP";
import Login from "./Pages/Login";
import { Toaster } from "react-hot-toast";
import UserDashBoard from "./Pages/User/UserDashBoard";
import Private from "./Components/Routes/Private";
import { useAuth } from "./Context/AuthContext";
import ForgotPassword from "./Pages/ForgotPassword";
import AdminRoute from "./Components/Routes/AdminRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Profile from "./Pages/User/Profile";
import Order from "./Pages/User/Order";
import CreateCategory from "./Pages/Admin/Category/CreateCategory";
import AdminUsers from "./Pages/Admin/AdminUsers";

import CreateProducts from "./Pages/Admin/Products/CreateProducts";
import Products from "./Pages/Admin/Products/Products";
import UpdateProduct from "./Pages/Admin/Products/UpdateProduct";
import SearchPage from "./Pages/SearchPage";
import ProductsDetails from "./Pages/ProductsDetails";
import Categories from "./Pages/Categories";
import CartPage from "./Pages/Cart/CartPage";
import AdminOrders from "./Pages/Admin/Orders.jsx/AdminOrders";
function App() {
  const [auth, setauth] = useAuth();

  // console.log(auth);
  return (
    <>
      <BrowserRouter>
        <SEO></SEO>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/product/:slug" element={<ProductsDetails />}></Route>
          <Route path="/search" element={<SearchPage></SearchPage>}></Route>
          <Route
            path="/category/:slug"
            element={<Categories></Categories>}
          ></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          {auth?.user?.role == 0 ? (
            <>
              {/* user Dashboard route */}
              <Route path="/dashboard/user" element={<Private></Private>}>
                <Route
                  path=""
                  element={<UserDashBoard></UserDashBoard>}
                ></Route>
                <Route path="profile" element={<Profile></Profile>}></Route>
                <Route path="orders" element={<Order></Order>}></Route>
              </Route>
            </>
          ) : (
            <>
              {/* admin dashboard */}
              <Route
                path="/dashboard/admin"
                element={<AdminRoute></AdminRoute>}
              >
                <Route
                  path=""
                  element={<AdminDashboard></AdminDashboard>}
                ></Route>
                <Route
                  path="create-category"
                  element={<CreateCategory />}
                ></Route>
                <Route
                  path="create-products"
                  element={<CreateProducts></CreateProducts>}
                ></Route>
                <Route path="products" element={<Products></Products>}></Route>
                <Route
                  path="update-products/:slug"
                  element={<UpdateProduct></UpdateProduct>}
                ></Route>
                <Route path="orders" element={<AdminOrders />}></Route>
                <Route path="users" element={<AdminUsers></AdminUsers>}></Route>
              </Route>
            </>
          )}

          {!auth.user ? (
            <>
              <Route path="/signup" element={<SignUP></SignUP>}></Route>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route
                path="/forgotpassword"
                element={<ForgotPassword></ForgotPassword>}
              ></Route>
            </>
          ) : (
            ""
          )}

          <Route path="/contact" element={<Contact></Contact>}></Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
        <Toaster></Toaster>
      </BrowserRouter>
    </>
  );
}

export default App;
