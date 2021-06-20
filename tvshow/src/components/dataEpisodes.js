import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from './useFetch';
import '../styles/dataEpisode.css';

const DataEpisode = () => {
  const { id } = useParams();

  const URL = `http://api.tvmaze.com/episodes/${id}`;

  const { data, hasError } = useFetch(URL);

  return (
    <React.Fragment>
      {hasError ? (
        <div>An error has occured.</div>
      ) : (
        <section className={`episode season-${data?.season}`}>
          <h4>
            Season {data?.season} - Episode {data?.number}
          </h4>
          <h3>{data?.name}</h3>
          <div className="airdateInfo">
            <img src={data?.image.medium} alt="Episode portrait"></img>
            <div className="info">
              <p>Duration: {data?.runtime} mins</p>
              <p>Release Date: {data?.airdate}</p>
            </div>
          </div>
          <div
            className="descriptionText"
            dangerouslySetInnerHTML={{ __html: data?.summary }}
          ></div>
        </section>
      )}
    </React.Fragment>
  );
};

export default DataEpisode;
