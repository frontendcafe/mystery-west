import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import imageShow from '../images/seinfeld.png';
import '../styles/datashow.css';

const DataShow = () => {
  const url = 'http://api.tvmaze.com/shows/530';

  const { data: dataShow, isError: hasError } = useQuery(
    'show',
    () => fetch(`${url}`).then((res) => res.json()),
    { refetchOnWindowFocus: false }
  );

  return (
    <React.Fragment>
      {hasError ? (
        <div>An error has occured.</div>
      ) : (
        <React.Fragment>
          <section className="showDescription">
            <img src={imageShow} alt="show poster" className="showImage" />
            <div className="textDescription">
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: dataShow?.summary }}
              ></div>
              <ShortList />
            </div>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const ShortList = () => {
  const URL = 'http://api.tvmaze.com/shows/530/episodes';

  const { data: episodeData, isError: hasError } = useQuery(
    'episodeList',
    () => fetch(`${URL}`).then((res) => res.json()),
    { refetchOnWindowFocus: false }
  );

  return (
    <React.Fragment>
      <h4>Episode List</h4>
      <ul className="episodeList">
        <div className="summaryList">
          <li className="episodeNum title">Season</li>
          <li className="episodeNum title">Episode</li>
          <li className="episodeName title">Name</li>
        </div>
        {hasError ? (
          <div>An error has occured.</div>
        ) : (
          episodeData
            ?.filter(
              (episodes) => episodes.season === 1 && episodes.number <= 5
            )
            .map((item) => (
              <div key={item.id} className="summaryList">
                <li className="episodeNum number">{item.season} </li>
                <li className="episodeNum number">{item.number} </li>
                <Link
                  className="episodeName"
                  to={`/id=${item.id}/season_${item.season}/episode_${item.number}`}
                >
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

export default DataShow;
