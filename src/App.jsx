import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Pages/Admin";
import Private from "./Private";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <Private>
              <Admin />
            </Private>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
