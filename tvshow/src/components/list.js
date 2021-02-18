import React, { useState, useEffect } from "react";

const URL = "http://api.tvmaze.com/shows/530";

const List = () => {
  const [list, setList] = useState(null);
  const [hasError, setHasError] = useState(false);

  const getData = () => fetch(`${URL}/episodes`).then((res) => res.json());

  useEffect(() => {
    getData()
      .then((list) => setList(list))
      .catch((err) => setHasError(true));
  }, []);

  return (
    <React.Fragment>
      {hasError ? (
        <div>An error has occured.</div>
      ) : (
        list?.map((item) => (
          <section key={item.id}>
            <p>
              Season {item.season} - Episode {item.number} - {item.name}
            </p>
          </section>
        ))
      )}
    </React.Fragment>
  );
};

export default List;
