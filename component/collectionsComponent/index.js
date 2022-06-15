import { Heading, Button, Box, Link } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { css, cx } from "@emotion/css";

const CollectionsComponent = ({ onOpen, onHandleItemClick }) => {
  const [animeCollections, setAnimeCollections] = useState([]);

  let localAnimeStorage;
  useEffect(() => {
    if (typeof window !== "undefined") {
      localAnimeStorage = JSON.parse(localStorage.getItem("animeCollections"));

      if (localAnimeStorage) {
        setAnimeCollections(localAnimeStorage);
      } else {
        setAnimeCollections([]);
      }
    }
  }, []);

  return (
    <Box
      className={css`
        margin-top: 3em;
        margin: 0.5em;
      `}
    >
      <Heading as="h1" size="lg">
        ANIME COLLECTIONS
      </Heading>

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
            You don't have anime collections yet. Add it{" "}
            <Link color="blue" href="/collection">
              here
            </Link>
          </div>
        )}

        <Box
          className={css`
            margin: 2em 10%;
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
              <Box
                className={css`
                  position: relative;
                  cursor: pointer;
                  border-radius: 8px;
                  border-style: solid;
                  border-width: 1px;
                  height: 3.5em;
                `}
              >
                <div
                  key={i}
                  className={css`
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                  `}
                  onClick={() => onHandleItemClick(item)}
                >
                  <p
                    className={css`
                      margin-top: 1em;
                    `}
                  >
                    {item}
                  </p>
                </div>
              </Box>
            );
          })}
        </Box>
      </div>
    </Box>
  );
};

export default CollectionsComponent;
