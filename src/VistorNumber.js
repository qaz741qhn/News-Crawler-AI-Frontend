import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const VisitorNumber = () => {
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    const visited = Cookies.get('visited');
    if (!visited) {
      Cookies.set('visited', 'true', { expires: 365 });
      fetch('https://news-crawler-ai-backend.herokuapp.com/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => response.json())
        .then(data => setVisits(data.count)) // Assumes the server responds with { count: newCount }
        .catch(err => console.error(err));
    }
  }, []);

  return (
    <div>
      <h2>Visits: {visits}</h2>
    </div>
  );
};

export default VisitorNumber;
