import React, { useEffect, useState } from "react";
import { css, cx } from "@emotion/css";

const CollectionList = () => {
  let localAnimeStorage;
  useEffect(() => {
    if (typeof window !== "undefined") {
      localAnimeStorage = JSON.parse(localStorage.getItem("animeCollections"));

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
        {!animeCollections ||
          (animeCollections.length === 0 && (
            <div
              className={css`
                text-align: center;
              `}
            >
              You don't have collections yet. Add it <a href="/">here</a>
            </div>
          ))}
        <div
          className={css`
            margin: 3em 18%;
            display: grid;
            grid-template-columns: auto auto auto auto auto;
            grid-gap: 1em;
            @media (max-width: 768px) {
              grid-template-columns: auto auto;
              margin: 1em 0;
            }
          `}
        >
          {animeCollections.map((item, i) => {
            return (
              <div
                key={i}
                className={css`
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  cursor: pointer;
                  border-radius: 8px;
                  border-style: solid;
                  border-width: 0.5px;
                `}
                onClick={() => onHandleItemClick(item.id)}
              >
                <img
                  className={css`
                    object-fit: cover;
                  `}
                  src={item.coverImage.large}
                  alt="Cover Image"
                />
                <p
                  className={css`
                    margin-top: 1em;
                  `}
                >
                  {item.title?.romaji}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CollectionList;
