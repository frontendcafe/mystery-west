import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import '../styles/list.css';

const List = () => {
  const URL = 'http://api.tvmaze.com/shows/530';

  const {
    data: episodesData,
    isError: episodesDHasError,
    isLoading: episodesDIsLoading,
  } = useQuery(
    'episodes',
    () => fetch(`${URL}/episodes`).then((res) => res.json()),
    { refetchOnWindowFocus: false }
  );

  const { data: seasonsData } = useQuery(
    'seasons',
    () => fetch(`${URL}/seasons`).then((res) => res.json()),
    { refetchOnWindowFocus: false }
  );

  let render = [];
  /*
   *  [                                              _
   *    {  "key"  : "value" ,                         |
   *       "key"  : "value" ,                         |
   *       "key"  : "value",                          |
   *       "list" : [       _                         |
   *                  {},    |                        |
   *                  {},    |-->  episodes season 1  |-->Info season 1,
   *                  {},    |                        |
   *                 ...    _|                        |
   *               ]                                  |
   *    },                                           _|
   *    {  "key"  : "value" ,                         |
   *       "key"  : "value" ,                         |
   *       "key"  : "value",                          |
   *       "list" : [       _                         |
   *                  {},    |                        |
   *                  {},    |-->  episodes season 2  |-->Info season 2,
   *                  {},    |                        |
   *                 ...    _|                        |
   *               ]                                  |
   *    },                                           _|
   *      ...
   *  ]
   *
   */

  if (seasonsData && episodesData) {
    seasonsData.forEach((season) => {
      const epiList = [];

      render.push({
        seasonNumber: season.number,
        episodes: season.episodeOrder,
        url: season.image.medium,
        seasonId: season.id,
        episodeList: epiList,
      });

      episodesData.forEach((episode) => {
        if (season.number === episode.season) {
          epiList.push({
            id: episode.id,
            name: episode.name,
            episodeN: episode.number,
            seasonN: episode.season,
          });
        }
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
      {episodesDIsLoading ? (
        <span>Loading ...</span>
      ) : episodesDHasError ? (
        <span>Ooops!... An error has ocurred.</span>
      ) : (
        render?.map((season, index) => (
          <section key={season.seasonId} className="season">
            <img
              className="seasonImage"
              src={season?.url}
              alt="season portrait"
            ></img>
            <h3 className="seasonNumber">Season {season?.seasonNumber}</h3>
            <button
              className={`button-${season.seasonNumber}`}
              onClick={handleClick(index)}
              key={`${season.seasonId}_action`}
            >
              {season?.episodes} Episodes
            </button>
            <ul
              className={
                isClickedIndex[index] ? `episodeList` : `episodeListHidden`
              }
            >
              <div className="summaryList">
                <li className="episodeNum title">Episode</li>
                <li className="episodeName title">Name</li>
              </div>
              {season?.episodeList?.map((episode) => (
                <div
                  key={`${episode.id}_number`}
                  className="summaryList sumListMargin"
                >
                  <li className="episodeNum number">{episode?.episodeN}</li>
                  <Link
                    className="episodeName"
                    to={`/id=${episode.id}/season_${episode.seasonN}/episode_${episode.episodeN}`}
                  >
                    {episode?.name}
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
