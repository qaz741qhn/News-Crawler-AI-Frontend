import React, { useState } from 'react';
import useFetch from './useFetch';

const NewsSection = () => {
  const { data: newsData, isPending, error } = useFetch('http://localhost:3000/news');

  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 10;

  // Get current news
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = newsData && newsData.slice(indexOfFirstNews, indexOfLastNews);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(newsData && newsData.length / newsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='news-card'>
      <h2>Latest News</h2>
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { currentNews && currentNews.map((news) => (
        <div key={news.id}>
          <h3>{ news.title }</h3>
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
