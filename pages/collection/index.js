import React, { useEffect, useState } from "react";
import { css, cx } from "@emotion/css";
import { useRouter } from "next/router";

const CollectionList = () => {
  const router = useRouter();

  const [animeCollections, setAnimeCollections] = useState([]);

  const onHandleItemClick = (id) => {
    router.push(`/${id}`);
  };

  const onHandleDelete = (deletedId) => {
    let confirmation = "Confirm Delete?";
    if (!confirm(confirmation)) {
      return;
    }

    const filteredCollections = animeCollections.filter(
      (item) => item.id !== deletedId
    );

    setAnimeCollections(filteredCollections);
  };

  let localAnimeStorage;
  useEffect(() => {
    if (typeof window !== "undefined") {
      localAnimeStorage = JSON.parse(localStorage.getItem("animeCollections"));

      setAnimeCollections(localAnimeStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("animeCollections", JSON.stringify(animeCollections));
  }, [animeCollections]);

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
        {(!animeCollections || animeCollections.length === 0) && (
          <div
            className={css`
              text-align: center;
            `}
          >
            You don't have anime collections yet. Add it <a href="/">here</a>
          </div>
        )}

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
          {animeCollections?.map((item, i) => {
            return (
              <div
                className={css`
                  position: relative;
                  cursor: pointer;
                  border-radius: 8px;
                  border-style: solid;
                  border-width: 0.5px;
                `}
              >
                <div
                  className={css`
                    position: absolute;
                    top: 4px;
                    right: 4px;
                    z-index: 10;
                  `}
                >
                  <button
                    className="ui icon red button"
                    onClick={() => onHandleDelete(item.id)}
                  >
                    <i class="x icon"></i>
                  </button>
                </div>
                <div
                  key={i}
                  className={css`
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CollectionList;
