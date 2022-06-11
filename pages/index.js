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

      <h1>Anime List</h1>
      <div
        className={css`
          display: grid;
          grid-template-columns: auto auto auto auto;
          grid-gap: 1em;
        `}
      >
        {animeList.map((item, i) => {
          return (
            <div
              key={i}
              className={css`
                cursor: pointer;
              `}
              onClick={() => onHandleItemClick(item.id)}
            >
              <img src={item.coverImage.large} alt="Cover Image" />
              <p>{item.title?.romaji}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LandingPage;
