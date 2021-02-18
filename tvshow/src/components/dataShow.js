import React, { useState, useEffect } from "react";

const DataShow = () => {
  const [dataShow, setDataShow] = useState(null);
  const [hasError, setHasError] = useState(false);

  const getData = () =>
    fetch("http://api.tvmaze.com/shows/530").then((res) => res.json());

  useEffect(() => {
    getData()
      .then((dataShow) => setDataShow(dataShow))
      .catch((err) => setHasError(true));
  }, []);

  return (
    <React.Fragment>
      {hasError ? (
        <div>An error has occured.</div>
      ) : (
        <section className="episode">
          <h2>{dataShow?.name}</h2>
          <img src={dataShow?.image.medium} alt="ipsum"></img>
          <p>{dataShow?.summary}</p>
        </section>
      )}
    </React.Fragment>
  );
};

export default DataShow;
