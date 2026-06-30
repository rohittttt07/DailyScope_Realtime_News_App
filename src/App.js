import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Components/Navbar";
import News from "./Components/News";
import Favorites from "./Components/Favorites";
import Footer from "./Components/Footer";
import NotFound from "./Components/NotFound";
import ScrollToTop from "./Components/ScrollToTop";

function App() {

  // Loading Bar
  const [progress, setProgress] = useState(0);

  // Dark Mode
  const [darkMode, setDarkMode] = useState(false);

  // API Key
  const apiKey = process.env.REACT_APP_GNEWS_API;

  // Load Saved Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  // Toggle Theme
  const toggleTheme = () => {
    if (darkMode) {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    }

    setDarkMode(!darkMode);
  };

  return (
    <>

      {/* Top Loading Bar */}
      <LoadingBar
        color="#ff3d00"
        progress={progress}
        height={4}
        onLoaderFinished={() => setProgress(0)}
      />

      {/* Navbar */}
      <Navbar
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />

      {/* Scroll to Top on Route Change */}
      <ScrollToTop />

      <Routes>
                {/* General */}
        <Route
          path="/"
          element={
            <News
              key="general"
              apiKey={apiKey}
              setProgress={setProgress}
              country="in"
              category="general"
            />
          }
        />

        {/* World */}
        <Route
          path="/world"
          element={
            <News
              key="world"
              apiKey={apiKey}
              setProgress={setProgress}
              country="in"
              category="world"
            />
          }
        />

        {/* Nation */}
        <Route
          path="/nation"
          element={
            <News
              key="nation"
              apiKey={apiKey}
              setProgress={setProgress}
              country="in"
              category="nation"
            />
          }
        />

        {/* Business */}
        <Route
          path="/business"
          element={
            <News
              key="business"
              apiKey={apiKey}
              setProgress={setProgress}
              country="in"
              category="business"
            />
          }
        />

        {/* Technology */}
        <Route
          path="/technology"
          element={
            <News
              key="technology"
              apiKey={apiKey}
              setProgress={setProgress}
              country="in"
              category="technology"
            />
          }
        />

        {/* Entertainment */}
        <Route
          path="/entertainment"
          element={
            <News
              key="entertainment"
              apiKey={apiKey}
              setProgress={setProgress}
              country="in"
              category="entertainment"
            />
          }
        />

        {/* Sports */}
        <Route
          path="/sports"
          element={
            <News
              key="sports"
              apiKey={apiKey}
              setProgress={setProgress}
              country="in"
              category="sports"
            />
          }
        />

        {/* Science */}
        <Route
          path="/science"
          element={
            <News
              key="science"
              apiKey={apiKey}
              setProgress={setProgress}
              country="in"
              category="science"
            />
          }
        />

        {/* Health */}
        <Route
          path="/health"
          element={
            <News
              key="health"
              apiKey={apiKey}
              setProgress={setProgress}
              country="in"
              category="health"
            />
          }
        />

        {/* Search */}
        <Route
          path="/search/:category"
          element={
            <News
              key="search"
              apiKey={apiKey}
              setProgress={setProgress}
              country="in"
            />
          }
        />

        {/* Favorites */}
        <Route
          path="/favorites"
          element={<Favorites />}
        />

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

    </>
  );
}

export default App;