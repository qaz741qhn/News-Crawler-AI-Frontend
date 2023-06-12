import React, {useState} from "react";
import { fetchAPI } from "./useFetch";

const NewsCard = ({ news, apiURL }) => {
  const [isTranslated, setIsTranslated] = useState(false);
  const [isTranlating, setIsTranslating] = useState(false);
  const [translatedSummary, setTranslatedSummary] = useState("");
  const [summaryClass, setSummaryClass] = useState('en');

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  const handleTranslate = async (event, apiURL) => {
    event.preventDefault();
    setIsTranslating(true);

    if (news.translation) {
      setTranslatedSummary(news.translation);
    } else {
      const body = {
        prompt: `以下の英語の新聞要約「${news.summary}」を日本の読者に適した、「ですます形」ではなく、普通形で専門的、かつ簡潔的な日本語の新聞要約に翻訳してください。一般的な新聞の書き方でお願いします。`,
      };

      const data = await fetchAPI(`${apiURL}/news/${news.id}/translate`, body);
      setTranslatedSummary(data.translation);
    }

    setIsTranslated(!isTranslated);
    setIsTranslating(false);
    setSummaryClass(summaryClass === 'en' ? 'jp' : 'en');
  };

  return (
    <div className="news-card" key={news.id}>
      <h3>{news.title}</h3>
      <p>{formatDate(news.date)}</p>
      <div className={summaryClass}>{isTranslated ? translatedSummary : news.summary}</div>
      <button onClick={(event) => handleTranslate(event, apiURL)} disabled={isTranlating}>
        {isTranlating && <span>Translating to </span>}
        {isTranslated ? "English" : "日本語"}
      </button>
      <p>Source: <a href={news.source} target="_blank" rel="noopener noreferrer">{news.source}</a></p>
    </div>
  );
};

export default NewsCard;
