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
        prompt: `以下の英語のニュース「${news.content}」を日本の読者に適した、ですます形ではなく、普通形で80字以下、専門的、かつ簡潔的な日本語の新聞要約に翻訳してください。一般的な新聞の書き方でお願いします。`,
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
      <button onClick={(event) => handleTranslate(event, "https://multi-api.herokuapp.com")}>
        {isTranslated ? "English" : "日本語"}
      </button>
      <p>Source: <a href={news.source} target="_blank" rel="noopener noreferrer">{news.source}</a></p>
    </div>
  );
};

export default NewsCard;
