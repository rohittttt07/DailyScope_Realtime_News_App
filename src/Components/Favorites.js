import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from Local Storage
  const loadFavorites = () => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(savedFavorites);
  };

  useEffect(() => {
    loadFavorites();

    // Update automatically when favorites change
    const handleFavoritesUpdated = () => {
      loadFavorites();
    };

    window.addEventListener(
      "favoritesUpdated",
      handleFavoritesUpdated
    );

    return () => {
      window.removeEventListener(
        "favoritesUpdated",
        handleFavoritesUpdated
      );
    };
  }, []);

  return (
    <div className="container mt-4">

      <h1 className="text-center my-4">
        ❤️ Favorite News
      </h1>

      {favorites.length === 0 ? (
        <div className="alert alert-info text-center">
          <h4>No Favorite Articles</h4>
          <p>
            Add your favorite news by clicking
            <strong> ❤️ Add to Favorites </strong>
            on any news card.
          </p>
        </div>
      ) : (
        <div className="row">

          {favorites.map((article) => (
            <div
              className="col-lg-3 col-md-4 col-sm-6 mb-4"
              key={article.url}
            >
              <NewsItems
                title={article.title}
                description={article.description}
                imageUrl={article.image}
                newsUrl={article.url}
                author={article.author}
                date={article.date}
                source={article.source}
              />
            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Favorites;