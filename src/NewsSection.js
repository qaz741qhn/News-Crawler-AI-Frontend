import React, { useState } from 'react';
import useFetch from './useFetch';

const NewsSection = () => {
  const { data: newsData, isPending, error } = useFetch('https://news-crawler-ai-backend.herokuapp.com/news');

  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 10;

  // Get current news
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const sortedNewsData = newsData && [...newsData].sort((a, b) => new Date(b.date) - new Date(a.date));
  const currentNews = sortedNewsData && sortedNewsData.slice(indexOfFirstNews, indexOfLastNews);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedNewsData && sortedNewsData.length / newsPerPage); i++) {
    pageNumbers.push(i);
  }

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  return (
    <div className='news-card'>
      <h2>Latest News</h2>
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { currentNews && currentNews.map((news) => (
        <div key={news.id}>
          <h3>{ news.title }</h3>
          <p>{ formatDate(news.date) }</p>
          <p>{ news.summary }</p>
          <p>Source: <a href={news.source} target="_blank" rel="noopener noreferrer">{news.source}</a></p>
        </div>
      ))}

      <div>
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NewsSection;
