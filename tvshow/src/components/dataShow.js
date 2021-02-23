import React from "react";
import { useFetch } from "./useFetch";

const DataShow = () => {
  const url = "http://api.tvmaze.com/shows/530";

  const { data, hasError } = useFetch(url);

  return (
    <React.Fragment>
      {hasError ? (
        <div>An error has occured.</div>
      ) : (
        <section className="episode">
          <h2>{data?.name}</h2>
          <img src={data?.image.medium} alt="Show post portrait"></img>
          <p dangerouslySetInnerHTML={{ __html: data?.summary }}></p>
        </section>
      )}
    </React.Fragment>
  );
};

export default DataShow;
