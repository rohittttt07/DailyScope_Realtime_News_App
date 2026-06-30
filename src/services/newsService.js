const BASE_URL = "https://gnews.io/api/v4";

export const getNews = async ({
  category = "general",
  country = "in",
  page = 1,
  apiKey,
}) => {
  let url = "";

  // General News
  if (category === "general") {
    url = `${BASE_URL}/top-headlines?country=${country}&lang=en&max=10&page=${page}&apikey=${apiKey}`;
  }

  // Category News
  else if (
    [
      "business",
      "technology",
      "sports",
      "science",
      "health",
      "entertainment",
      "world",
      "nation",
    ].includes(category)
  ) {
    const keyword =
      category === "nation" ? "india" : category;

    url = `${BASE_URL}/search?q=${keyword}&country=${country}&lang=en&max=10&page=${page}&apikey=${apiKey}`;
  }

  // Search News
  else {
    url = `${BASE_URL}/search?q=${encodeURIComponent(
      category
    )}&country=${country}&lang=en&max=10&page=${page}&apikey=${apiKey}`;
  }

  const response = await fetch(url);

  if (response.status === 429) {
    throw new Error(
      "DailyScope has reached the free GNews API limit. Please try again later."
    );
  }

  if (!response.ok) {
    throw new Error("Failed to fetch news.");
  }

  return await response.json();
};