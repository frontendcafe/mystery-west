import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "./useFetch";

const List = () => {
  const URL = "http://api.tvmaze.com/shows/530/episodes";

  const { data, hasError } = useFetch(URL);

  return (
    <React.Fragment>
      {hasError ? (
        <div>An error has occured.</div>
      ) : (
        data?.map((item) => (
          <section key={item.id}>
            <Link to={`/episodes/${item.id}`}>
              Season {item.season} - Episode {item.number} - {item.name}
            </Link>
          </section>
        ))
      )}
    </React.Fragment>
  );
};

export default List;
