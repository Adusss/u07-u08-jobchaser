import "./App.css";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";

import Header from "./components/ui/Header";
import JobsPage from "./components/pages/JobsPage";
import Signup from "./components/ui/Signup";
import Signin from "./components/ui/Signin";
import Footer from "./components/ui/Footer";
import AddJob from "./components/pages/AddJob";

import ProtectedRoute from "./components/ProtectedRoute";

import "./css/App.css";

export function App() {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/jobs" />} />

          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <JobsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-job"
            element={
              <ProtectedRoute>
                <AddJob />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
