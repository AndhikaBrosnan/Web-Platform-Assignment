import Head from "next/head";
import { useEffect, useState } from "react";
import { useAnimeListQuery } from "../hooks/useAnimeListQuery";
import { css, cx } from "@emotion/css";
import { useRouter } from "next/router";

const LandingPage = () => {
  const mediaList = useAnimeListQuery();
  const router = useRouter();

  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    if (mediaList) {
      setAnimeList(mediaList);
    }
  }, [mediaList]);

  const onHandleItemClick = (id) => {
    router.push(`/${id}`);
  };

  return (
    <>
      <Head>
        <title>Anime List</title>
      </Head>
      <div
        className={css`
          margin-top: 2em;
        `}
      >
        <h1>LIST OF ANIMES</h1>
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
          {animeList.map((item, i) => {
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
    </>
  );
};

export default LandingPage;
