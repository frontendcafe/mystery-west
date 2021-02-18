import React, { useState, useEffect } from "react";
import "./style/dataEpisode.css";

const URL = "http://api.tvmaze.com/shows/530";

const DataEpisodes = () => {
  const [episode, setEpisode] = useState(null);
  const [hasError, setHasError] = useState(false);

  const getData = () => fetch(`${URL}/episodes`).then((res) => res.json());

  useEffect(() => {
    getData()
      .then((episode) => setEpisode(episode))
      .catch((err) => setHasError(true));
  }, []);

  return (
    <React.Fragment>
      {hasError ? (
        <div>An error has occured.</div>
      ) : (
        episode?.map((item) => (
          <section className="episode" key={item.id}>
            <h3>{item.name}</h3>
            <h5>
              Season {item.season} - Episode {item.number}
            </h5>
            <img src={item.image.medium} alt="lorem"></img>
            <div>
              <p>{item.summary}</p>
              <p>Duration: {item.runtime}</p>
              <p>Date: {item.airdate}</p>
            </div>
          </section>
        ))
      )}
    </React.Fragment>
  );
};

export default DataEpisodes;
