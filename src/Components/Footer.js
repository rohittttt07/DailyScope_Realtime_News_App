import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 py-4">
      <div className="container text-center">

        <h5 className="fw-bold">📰 DailyScope</h5>

        <p className="mb-1">
          Stay updated with the latest news from around the world.
        </p>

        <small>
          © {new Date().getFullYear()} DailyScope 
        </small>

      </div>
    </footer>
  );
};

export default Footer;