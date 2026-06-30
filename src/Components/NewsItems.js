import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const NewsItems = ({
  title,
  description,
  imageUrl,
  newsUrl,
  author,
  date,
  source,
}) => {
  const defaultImage =
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1000&q=80";

  const [favorite, setFavorite] = useState(false);

  // Check if article already exists in favorites
  const checkFavorite = () => {
    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    return favorites.some((item) => item.url === newsUrl);
  };

  useEffect(() => {
    setFavorite(checkFavorite());
  }, [newsUrl]);

  // Add or Remove Favorite
  const handleFavorite = () => {
    let favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    if (checkFavorite()) {
      favorites = favorites.filter(
        (item) => item.url !== newsUrl
      );

      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
      );

      setFavorite(false);

      toast.info("Removed from Favorites");

      window.dispatchEvent(new Event("favoritesUpdated"));
    } else {
      const article = {
        title,
        description,
        image: imageUrl,
        url: newsUrl,
        author,
        date,
        source,
      };

      favorites.push(article);

      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
      );

      setFavorite(true);

      toast.success("Added to Favorites ❤️");

      window.dispatchEvent(new Event("favoritesUpdated"));
    }
  };

  return (
    <div
      className="card h-100 shadow news-card position-relative"
      style={{
        borderRadius: "15px",
        overflow: "hidden",
      }}
    >
      {/* Source Badge */}
      <span
        className="badge bg-danger position-absolute"
        style={{
          top: "12px",
          right: "12px",
          zIndex: 2,
          padding: "7px 14px",
          borderRadius: "20px",
          fontSize: "11px",
          fontWeight: "600",
        }}
      >
        {source || "News"}
      </span>

      {/* News Image */}
      <img
        src={imageUrl || defaultImage}
        alt="News"
        className="card-img-top"
        style={{
          height: "220px",
          objectFit: "cover",
        }}
        onError={(e) => {
          e.target.src = defaultImage;
        }}
      />

      {/* Card Body */}
      <div className="card-body d-flex flex-column">

        <h5 className="card-title fw-bold">
          {title
            ? title.length > 70
              ? title.substring(0, 70) + "..."
              : title
            : "No Title Available"}
        </h5>

        <p className="card-text text-secondary flex-grow-1">
          {description
            ? description.length > 120
              ? description.substring(0, 120) + "..."
              : description
            : "No Description Available"}
        </p>

        <small className="text-muted mb-3">
          <strong>{author || "Unknown"}</strong>
          <br />
          {date
            ? new Date(date).toLocaleString()
            : "Unknown Date"}
        </small>

        {/* Read More Button */}
        <a
          href={newsUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary"
        >
          Read More →
        </a>

        {/* Favorite Button */}
        <button
          className={`btn mt-2 ${
            favorite
              ? "btn-danger"
              : "btn-outline-danger"
          }`}
          onClick={handleFavorite}
        >
          {favorite
            ? "💔 Remove Favorite"
            : "❤️ Add to Favorites"}
        </button>

      </div>
    </div>
  );
};

export default NewsItems;