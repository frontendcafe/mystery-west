import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "./useFetch";
import "../styles/list.css";

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
    <div className="allSeasons">
      {hasError ? (
        <div>An error has occurred.</div>
      ) : (
        render?.map((season, index) => (
          <section key={index} className="season">
            <h3>Season {index}</h3>
            {season?.map((episode) => (
              <li key={episode.id}>
                <Link to={`/episodes/${episode.id}`}>
                  Ep{episode.episodeN} - {episode.name}
                </Link>
              </li>
            ))}
          </section>
        ))
      )}
    </div>
  );
};

export default List;
