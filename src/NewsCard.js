import React, {useState} from "react";
import { fetchAPI } from "./useFetch";

const NewsCard = ({ news }) => {
  const [isTranslated, setIsTranslated] = useState(false);
  const [translatedSummary, setTranslatedSummary] = useState("");

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  const handleTranslate = async (event, apiURL) => {
    event.preventDefault();

    if (news.translation) {
      setTranslatedSummary(news.translation);
    } else {
      const body = {
        prompt: `「${news.content}」を日本語100字くらいにまとめてください。`,
      };

      const data = await fetchAPI(`${apiURL}/news/${news.id}/translate`, body);
      setTranslatedSummary(data.translation);
    }

    setIsTranslated(!isTranslated);
  };

  return (
    <div key={news.id}>
      <h3>{news.title}</h3>
      <p>{formatDate(news.date)}</p>
      <p>{isTranslated ? translatedSummary : news.summary}</p>
      <button onClick={(event) => handleTranslate(event, "http://localhost:3000")}>
        {isTranslated ? "English" : "日本語"}
      </button>
      <p>Source: <a href={news.source} target="_blank" rel="noopener noreferrer">{news.source}</a></p>
    </div>
  );
};

export default NewsCard;
