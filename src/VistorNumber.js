import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const VistorNumber = () => {
  const [shouldSendRequest, setShouldSendRequest] = useState(false);
  let visits = Cookies.get("visits");
  const visited = Cookies.get("visited");

  if (!visited) {
    Cookies.set("visited", "true");
    if (!visits) {
      visits = 1;
    } else {
      visits = Number(visits) + 1;
    }
    Cookies.set("visits", visits);
    setShouldSendRequest(true);
  }

  useEffect(() => {
    if (shouldSendRequest) {
      fetch("https://news-crawler-ai-backend.herokuapp.com/visits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ count: visits }),
      });
    }
  }, [visits, shouldSendRequest]);

  return (
    <div>
      <h2>Visits: {visits}</h2>
    </div>
  );
};

export default VistorNumber;
