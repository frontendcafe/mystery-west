import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "./useFetch";
import Episodes from "./episodes";

const Seasons = () => {
  const URL = "http://api.tvmaze.com/shows/530/seasons";

  const { data, hasError } = useFetch(URL);

  return (
    <React.Fragment>
      {hasError ? (
        <div>Season not found.</div>
      ) : (
        data?.map((item) => (
          <div key={item.id}>
            <h2>
                <Link to={`/seasons/${item.id}`}>
                    Season {item.number}
                </Link>
            </h2>
            <Episodes season={item.id} />
          </div>
        ))
      )}
    </React.Fragment>
  );
};

export default Seasons;
