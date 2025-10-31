
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerificationPending from "./pages/VerificationPending";
import Layout from "./components/Layout";

const App: React.FC = () => {
  const isTrue = true;

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={isTrue ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route path="/dashboard" element={<Layout />} />
          <Route
            path="/verification-pending"
            element={<VerificationPending />}
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
};

export default App;

