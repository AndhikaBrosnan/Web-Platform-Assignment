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
      <div>
        <h1>{animeDetail?.title?.romaji}</h1>
        <img
          className={css`
            width: 100%;
          `}
          src={animeDetail.bannerImage}
          alt="Banner Image"
        />
        <p>{animeDetail.description}</p>
      </div>
    </>
  );
};

export default AnimeDetailPage;
