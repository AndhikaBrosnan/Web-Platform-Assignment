import React, { useEffect } from "react";
import { css, cx } from "@emotion/css";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAnimeDetailQuery } from "../hooks/useAnimeDetailQuery";

const AnimeDetailPage = () => {
  const { asPath } = useRouter();
  const pathnameDetail = asPath.slice(1);

  const animeDetail = useAnimeDetailQuery(parseInt(pathnameDetail));

  return (
    <>
      <Head>
        <title>Anime Detail</title>
      </Head>
      <div
        className={css`
          margin: 1em 0;
          text-align: center;
        `}
      >
        <h1>{animeDetail?.title?.romaji}</h1>
        <img
          className={css`
            width: 100%;
          `}
          src={animeDetail.bannerImage}
          alt="Banner Image"
        />
        <p
          className={css`
            margin: 1em;
          `}
        >
          {animeDetail.description}
        </p>

        <button className="ui primary button">Add to Collection</button>
      </div>
    </>
  );
};

export default AnimeDetailPage;
