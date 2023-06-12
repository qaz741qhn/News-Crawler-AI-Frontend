import React, { useState } from 'react';
import {useFetch} from './useFetch';
import NewsCard from './NewsCard';

const NewsSection = ({apiURL}) => {
  const { data: newsData, isPending, error } = useFetch('https://multi-api.herokuapp.com/news');
  
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

  return (
    <div className='news-card'>
      <h2>Latest News</h2>
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { currentNews && currentNews.map((news) => (
        <NewsCard key={news.id} news={news} apiURL={apiURL} />
      ))}

      <div className='page-number-button'>
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
