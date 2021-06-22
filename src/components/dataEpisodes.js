import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import '../styles/dataEpisode.css';

const DataEpisode = () => {
  const { id } = useParams();

  const URL = `http://api.tvmaze.com/episodes/${id}`;

  const { data: dataEpisodes, isError: hasError } = useQuery(
    'show',
    () => fetch(`${URL}`).then((res) => res.json()),
    { refetchOnWindowFocus: false }
  );

  return (
    <React.Fragment>
      {hasError ? (
        <div>An error has occured.</div>
      ) : (
        <section className={`episode season-${dataEpisodes?.season}`}>
          <h4 className="episodesNumber">
            Season {dataEpisodes?.season} - Episode {dataEpisodes?.number}
          </h4>
          <h3 className="episodesName">{dataEpisodes?.name}</h3>
          <div className="airdateInfo">
            <img
              className="episodeImage"
              src={dataEpisodes?.image.medium}
              alt="Episode portrait"
            ></img>
            <div className="episodeInfo">
              <p>Duration: {dataEpisodes?.runtime} mins</p>
              <p>Release Date: {dataEpisodes?.airdate}</p>
            </div>
          </div>

          <h4 className="summaryTitle">Summary</h4>
          <div
            className="episodeDescription"
            dangerouslySetInnerHTML={{ __html: dataEpisodes?.summary }}
          ></div>
        </section>
      )}
    </React.Fragment>
  );
};

export default DataEpisode;
