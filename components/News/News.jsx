import React from "react";
import NewsTab from "./components/NewsTab";

const NewsPage = ({ newsArticles }) => {
  return <NewsTab news={newsArticles} />;
};

export default NewsPage;
