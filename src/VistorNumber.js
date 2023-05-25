import React, { useEffect } from "react";

const VistorNumber = () => {
  let visits = localStorage.getItem("visits");
  if (!visits) {
    visits = 1;
  } else {
    visits = Number(visits) + 1;
  }
  localStorage.setItem("visits", visits);

  useEffect(() => {
    fetch("https://news-crawler-ai-backend.herokuapp.com/visits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count: visits }),
    });
  }, [visits]);

  return (
    <div>
      <h2>Visits: {visits}</h2>
    </div>
  );
};

export default VistorNumber;
