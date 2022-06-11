import React, { useEffect, useState } from "react";
import { css, cx } from "@emotion/css";

const CollectionList = () => {
  let localAnimeStorage;

  useEffect(() => {
    if (typeof window !== "undefined") {
      localAnimeStorage = localStorage.getItem("animeCollectons");

      setAnimeCollections(localAnimeStorage);
    }
  }, []);

  const [animeCollections, setAnimeCollections] = useState([]);

  return (
    <div
      className={css`
        margin-top: 2em;
      `}
    >
      <h1>ANIME COLLECTIONS</h1>

      <div
        className={css`
          margin-top: 2em;
        `}
      >
        {!animeCollections && (
          <div
            className={css`
              text-align: center;
            `}
          >
            You don't have collections yet. Add it <a href="/">here</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionList;
