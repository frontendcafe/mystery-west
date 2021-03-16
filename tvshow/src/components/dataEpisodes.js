import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "./useFetch";
import "./style/dataEpisode.css";

const DataEpisode = () => {
  const { id } = useParams();

  const URL = `http://api.tvmaze.com/episodes/${id}`;

  const { data, hasError } = useFetch(URL);

  return (
    <React.Fragment>
      {hasError ? (
        <div>An error has occured.</div>
      ) : (
        <section className="episode">
          <h3>{data?.name}</h3>
          <h5>
            Season {data?.season} - Episode {data?.number}
          </h5>
          <img src={data?.image.medium} alt="Episode portrait"></img>
          <div>
            <div dangerouslySetInnerHTML={{ __html: data?.summary }}></div>
            <p>Duration: {data?.runtime} mins</p>
            <p>Release Date: {data?.airdate}</p>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default DataEpisode;
