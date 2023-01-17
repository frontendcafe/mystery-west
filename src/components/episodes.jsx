import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "./useFetch";
import { useParams } from "react-router-dom";

const Episodes = (props) => {
  const { id } = useParams();
  const URL = `http://api.tvmaze.com/seasons/${props.season}/episodes`;
//   const URL = `http://api.tvmaze.com/seasons/2113/episodes`;

  const { data, hasError } = useFetch(URL);

  return (
    <React.Fragment>
      {hasError ? (
        <div>Episodes not found.</div>
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

export default Episodes;
