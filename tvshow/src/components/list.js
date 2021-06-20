import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from './useFetch';
import '../styles/list.css';

const List = () => {
  const URL = 'http://api.tvmaze.com/shows/530';

  const { data, hasError } = useFetch(`${URL}/episodes`);

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
      if (typeof render[episodeList.season] === 'undefined') {
        render[episodeList.season] = [];
      }
      render[episodeList.season].push({
        id: episodeList.id,
        name: episodeList.name,
        episodeN: episodeList.number,
      });
    });
  }

  const [isClickedIndex, setIsClickedIndex] = useState({});
  const handleClick = (index) => () => {
    setIsClickedIndex((state) => ({
      ...state, // <-- copy previous state
      [index]: !state[index], // <-- update value by index key
    }));
  };

  return (
    <div className="allSeasons">
      {hasError ? (
        <div>An error has occurred.</div>
      ) : (
        render?.map((season, index) => (
          <section key={index} className="season">
            <h3>Season {index}</h3>
            <button
              className={`button-${index}`}
              onClick={handleClick(index)}
              key={`${index}_action`}
            >
              {season?.length} Episodes
            </button>
            <ul
              className={
                isClickedIndex[index] ? `episodeList` : `episodeListHidden`
              }
            >
              <div className="summaryList">
                <li className="episodeNum">Episode</li>
                <li className="episodeName title">Name</li>
              </div>

              {season?.map((episode) => (
                <div
                  key={`${episode.id}_number`}
                  className="summaryList sumListMargin"
                >
                  <li className="episodeNum number">{episode.episodeN}</li>
                  <Link className="episodeName" to={`/episodes/${episode.id}`}>
                    {episode.name}
                  </Link>
                </div>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
};

export default List;
