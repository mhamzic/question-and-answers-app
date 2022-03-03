import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Question from "./pages/Question";

import "./assets/css/bootstrap.min.css";

import Register from "./pages/Register";

function App() {
  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
            {/* public routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/" element={<Home />} /> */}

            {/* protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/question/:questionId" element={<Question />} />
            </Route>

            <Route
              path="*"
              element={
                <div className="py-5 text-center">
                  <h1 className="display-1 text-bold">404</h1>
                  <h6>Page not found!</h6>
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
