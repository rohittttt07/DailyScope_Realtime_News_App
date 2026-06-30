import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";
import NewsItems from "./NewsItems";
import { getNews } from "../services/newsService";

const News = ({
  country = "in",
  category = "general",
  apiKey,
  setProgress,
}) => {

  const { category: searchCategory } = useParams();

  const currentCategory = searchCategory || category;

  const capitalizeFirstLetter = (word) =>
    word.charAt(0).toUpperCase() + word.slice(1);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

 useEffect(() => {
  // Scroll to top
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  document.title = `DailyScope - ${capitalizeFirstLetter(currentCategory)}`;

  updateNews(1);

  // eslint-disable-next-line
}, [currentCategory]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);

    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
    const updateNews = async (pageNo = 1) => {
    if (!navigator.onLine) {
      setError("No Internet Connection");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      if (setProgress) setProgress(10);

      const data = await getNews({
        category: currentCategory,
        country,
        page: pageNo,
        apiKey,
      });

      if (setProgress) setProgress(40);

      setArticles(data.articles || []);
      setTotalResults(data.totalArticles || 0);
      setPage(pageNo);

      if (setProgress) setProgress(80);

      setLoading(false);

      if (setProgress) setProgress(100);
    } catch (err) {
      console.error(err);

      setError(err.message || "Something went wrong.");

      setLoading(false);

      if (setProgress) setProgress(100);
    }
  };

  const fetchMoreData = async () => {
    if (!navigator.onLine) return;

    try {
      const nextPage = page + 1;

      if (setProgress) setProgress(10);

      const data = await getNews({
        category: currentCategory,
        country,
        page: nextPage,
        apiKey,
      });

      if (setProgress) setProgress(60);

      const newArticles = (data.articles || []).filter(
        (newArticle) =>
          !articles.some(
            (oldArticle) => oldArticle.url === newArticle.url
          )
      );

      setArticles((prev) => [...prev, ...newArticles]);

      setPage(nextPage);

      setTotalResults(data.totalArticles || totalResults);

      if (setProgress) setProgress(100);
    } catch (err) {
      console.error(err);

      if (setProgress) setProgress(100);
    }
  };
    return (
    <div className="container mt-4">

      <h1 className="text-center my-4">
        DailyScope - Top{" "}
        {capitalizeFirstLetter(currentCategory)} Headlines
      </h1>

      {/* Offline Alert */}
      {!isOnline && (
        <div className="alert alert-warning text-center">
          📡 <strong>No Internet Connection.</strong> Please check your internet connection.
        </div>
      )}

      {/* Error Card */}
      {error && (
        <div className="container my-4">
          <div className="card shadow border-0 text-center p-4">

            <h3 className="text-danger mb-3">
              ⚠️ Unable to Load News
            </h3>

            <p className="text-muted">
              {error}
            </p>

            <button
              className="btn btn-primary"
              onClick={() => updateNews(1)}
            >
              🔄 Retry
            </button>

          </div>
        </div>
      )}

      {/* Loading */}
      {loading && <Spinner />}

      {/* No News */}
      {!loading && !error && articles.length === 0 && (
        <div className="container my-5">
          <div className="card border-0 shadow text-center p-5">

            <h1>📰</h1>

            <h4>No News Found</h4>

            <p className="text-muted">
              Try another category or search keyword.
            </p>

          </div>
        </div>
      )}

      {/* News List */}
      {!loading && !error && articles.length > 0 && (
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
          endMessage={
            <h5 className="text-center my-4 text-secondary">
              🎉 You've reached the end.
            </h5>
          }
        >
          <div className="row">

            {articles.map((element) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6 mb-4"
                key={element.url}
              >
                <NewsItems
                  title={element.title}
                  description={element.description}
                  imageUrl={element.image}
                  newsUrl={element.url}
                  author={element.source?.name}
                  date={element.publishedAt}
                  source={element.source?.name}
                />
              </div>
            ))}

          </div>
        </InfiniteScroll>
      )}

    </div>
  );
};

export default News;