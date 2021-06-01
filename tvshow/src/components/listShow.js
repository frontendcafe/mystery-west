import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "./useFetch";
import "../styles/datashow.css";

const ShortList = () => {
  const URL = "http://api.tvmaze.com/shows/530/episodes";

  const { data, hasError } = useFetch(URL);

  return (
    <React.Fragment>
      <h4>Episode List</h4>
      <div className="summaryList">
        <p className="episodeNum">Season</p>
        <p className="episodeNum">Episode</p>
        <p className="episodeName title">Name</p>
      </div>
      {hasError ? (
        <div>An error has occured.</div>
      ) : (
        data
          ?.filter((episodes) => episodes.season === 1)
          .map((item) => (
            <div key={item.id} className="summaryList">
              <span className="episodeNum number">{item.season} </span>
              <span className="episodeNum number">{item.number} </span>
              <Link className="episodeName" to={`/episodes/${item.id}`}>
                {item.name}
              </Link>
            </div>
          ))
      )}
      <Link to="/episodes">Full episode list</Link>
    </React.Fragment>
  );
};

export default ShortList;
