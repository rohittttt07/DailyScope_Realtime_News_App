import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ darkMode, toggleTheme }) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchText.trim() !== "") {
      navigate(`/search/${searchText.trim()}`);
      setSearchText("");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
      <div className="container">

        {/* Logo */}
        <NavLink className="navbar-brand fw-bold fs-4" to="/">
          📰 DailyScope
        </NavLink>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <NavLink
                end
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active fw-bold text-info" : "nav-link"
                }
              >
                General
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/world"
                className={({ isActive }) =>
                  isActive ? "nav-link active fw-bold text-info" : "nav-link"
                }
              >
                World
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/nation"
                className={({ isActive }) =>
                  isActive ? "nav-link active fw-bold text-info" : "nav-link"
                }
              >
                Nation
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/business"
                className={({ isActive }) =>
                  isActive ? "nav-link active fw-bold text-info" : "nav-link"
                }
              >
                Business
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/technology"
                className={({ isActive }) =>
                  isActive ? "nav-link active fw-bold text-info" : "nav-link"
                }
              >
                Technology
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/entertainment"
                className={({ isActive }) =>
                  isActive ? "nav-link active fw-bold text-info" : "nav-link"
                }
              >
                Entertainment
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/sports"
                className={({ isActive }) =>
                  isActive ? "nav-link active fw-bold text-info" : "nav-link"
                }
              >
                Sports
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/science"
                className={({ isActive }) =>
                  isActive ? "nav-link active fw-bold text-info" : "nav-link"
                }
              >
                Science
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/health"
                className={({ isActive }) =>
                  isActive ? "nav-link active fw-bold text-info" : "nav-link"
                }
              >
                Health
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive ? "nav-link active fw-bold text-info" : "nav-link"
                }
              >
                ❤️
              </NavLink>
            </li>

          </ul>

          {/* Search Form */}
          <form className="d-flex me-3" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search News..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <button className="btn btn-info" type="submit">
              Search
            </button>
          </form>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-outline-light"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;