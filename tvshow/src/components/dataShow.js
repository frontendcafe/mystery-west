import React from "react";
import { useFetch } from "./useFetch";
import ShortList from "./listShow";
import imageShow from "../images/seinfeld.png";
import "../styles/datashow.css";

const DataShow = () => {
  const url = "http://api.tvmaze.com/shows/530";

  const { data, hasError } = useFetch(url);

  return (
    <React.Fragment>
      {hasError ? (
        <div>An error has occured.</div>
      ) : (
        <React.Fragment>
          <h2>{data?.name}</h2>
          <section className="showDescription">
            <img src={imageShow} alt="show poster" className="showImage" />
            <div>
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: data?.summary }}
              ></div>
              <ShortList />
            </div>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default DataShow;
