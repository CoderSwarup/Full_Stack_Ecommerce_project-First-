import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import PageNotFound from "./Pages/PageNotFound";
import SEO from "./Components/SEO";
import SignUP from "./Pages/SignUP";
import Login from "./Pages/Login";
import { Toaster } from "react-hot-toast";
import UserDashBoard from "./Pages/User/UserDashBoard";
import Private from "./Components/Routes/Private";
import { useAuth } from "./Context/AuthContext";
function App() {
  const [auth, setauth] = useAuth();
  return (
    <>
      <BrowserRouter>
        <SEO></SEO>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/dashboard" element={<Private></Private>}>
            <Route path="" element={<UserDashBoard></UserDashBoard>}></Route>
          </Route>
          {!auth.user ? (
            <>
              <Route path="/signup" element={<SignUP></SignUP>}></Route>
              <Route path="/login" element={<Login></Login>}></Route>
            </>
          ) : (
            ""
          )}

          <Route path="/about" element={<About></About>}></Route>
          <Route path="/contact" element={<Contact></Contact>}></Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
        <Toaster></Toaster>
      </BrowserRouter>
    </>
  );
}

export default App;
