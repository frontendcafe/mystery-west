import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "./useFetch";

const ShortList = () => {
  const URL = "http://api.tvmaze.com/shows/530/episodes";

  const { data, hasError } = useFetch(URL);

  return (
    <React.Fragment>
      <h4>Episode List</h4>
      <p>Season 1</p>
      {hasError ? (
        <div>An error has occured.</div>
      ) : (
        data
          ?.filter((episodes) => episodes.season === 1)
          .map((item) => (
            <section key={item.id}>
              <Link to={`/episodes/${item.id}`}>
                Episode {item.number} - {item.name}
              </Link>
            </section>
          ))
      )}
      <p>
        <Link to="/episodes">Full episode list</Link>
      </p>
    </React.Fragment>
  );
};

export default ShortList;
