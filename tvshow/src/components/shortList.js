import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from './useFetch';
import '../styles/datashow.css';

const ShortList = () => {
  const URL = 'http://api.tvmaze.com/shows/530/episodes';

  const { data, hasError } = useFetch(URL);

  return (
    <React.Fragment>
      <h4>Episode List</h4>
      <ul className="episodeList">
        <div className="summaryList">
          <li className="episodeNum">Season</li>
          <li className="episodeNum">Episode</li>
          <li className="episodeName title">Name</li>
        </div>
        {hasError ? (
          <div>An error has occured.</div>
        ) : (
          data
            ?.filter(
              (episodes) => episodes.season === 1 && episodes.number <= 5
            )
            .map((item) => (
              <div key={item.id} className="summaryList">
                <li className="episodeNum number">{item.season} </li>
                <li className="episodeNum number">{item.number} </li>
                <Link className="episodeName" to={`/episodes/${item.id}`}>
                  {item.name}
                </Link>
              </div>
            ))
        )}
      </ul>
      <Link to="/episodes">Full episode list</Link>
    </React.Fragment>
  );
};

export default ShortList;
