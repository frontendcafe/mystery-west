import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "./useFetch";

const List = () => {
  const URL = "http://api.tvmaze.com/shows/530/episodes";

  const { data, hasError } = useFetch(URL);

  let render = [];

  /**
   * [
   *  empty, season 0 does not exist
   *  [{},{},{},...], season 1
   *  [{},{},{},...]  season 2
   *  ...
   * ]
   */

  if (data) {
    data.forEach((episodeList) => {
      if (typeof render[episodeList.season] === "undefined") {
        render[episodeList.season] = [];
      }
      render[episodeList.season].push({
        id: episodeList.id,
        name: episodeList.name,
        episodeN: episodeList.number,
      });
    });
  }

  return (
    <React.Fragment>
      {hasError ? (
        <div>An error has occurred.</div>
      ) : (
        render?.map((season, index) => (
          <section key={index}>
            <h3>Season {index}</h3>
            {season?.map((episode) => (
              <div key={episode.id}>
                <Link to={`/episodes/${episode.id}`}>
                  <p>
                    Ep{episode.episodeN} - {episode.name}
                  </p>
                </Link>
              </div>
            ))}
          </section>
        ))
      )}
    </React.Fragment>
  );
};

export default List;
