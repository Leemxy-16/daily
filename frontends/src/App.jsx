import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import SearchFunction from "./pages/Search";
import Library from "./Pages/library";
import MovieDetail from "./Pages/MovieDetail";
import Profile from "./Pages/Profile";
import LandingPage from "./Profileages/LandingPage";
import SignUp from "./Pages/SignUp";
import AdminDashboard from "./Pages/AdminDashboard";
import ProtectedRoute from "./Components/ProtectRoutes/protectRoute"; //
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/log_In" element={<Login />} />
        <Route path="/sign_Up" element={<SignUp />} />
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchFunction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <ProtectedRoute>
              <MovieDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* <Route path="*" element={<div className="p-8">Page not found</div>} /> */}
        <Route path="*" element={<NotFound/>} />

      </Routes>
    </Router>
  );
}

export default App;