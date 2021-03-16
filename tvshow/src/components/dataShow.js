import React from "react";
import { useFetch } from "./useFetch";
import ShortList from "./listShow";
import imageShow from "../images/seinfeld.png";

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
          <img src={imageShow} alt="show poster" />
          <div dangerouslySetInnerHTML={{ __html: data?.summary }}></div>
          <ShortList />
        </section>
      )}
    </React.Fragment>
  );
};

export default DataShow;
