import React from "react";
import Article from '../../components/Article';

const ArticleList = ({ articles }) => {
  return (
   <ul className="article-list">
      {articles.map((article, i) => (
          <Article
            key={i}
            title={article.title}
            image={article.urlToImage}
            url={article.url}
            description={article.description} />
        ))}
    </ul>
  );
};

export default ArticleList;
