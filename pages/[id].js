import React, { useEffect, useState } from "react";
import { css, cx } from "@emotion/css";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAnimeDetailQuery } from "../hooks/useAnimeDetailQuery";

const AnimeDetailPage = () => {
  const { asPath } = useRouter();
  const pathnameDetail = asPath.slice(1);

  const [animeCollections, setAnimeCollections] = useState([]);

  let storageAnimeCollection;
  useEffect(() => {
    if (typeof window !== "undefined") {
      storageAnimeCollection = JSON.parse(
        localStorage.getItem("animeCollections")
      );

      if (storageAnimeCollection) {
        setAnimeCollections(storageAnimeCollection);
      }
    }
  }, []);

  const animeDetail = useAnimeDetailQuery(parseInt(pathnameDetail));

  const onHandleAddToCollection = () => {
    const collectionsObj = {
      coverImage: animeDetail.coverImage,
      title: animeDetail.title,
    };

    setAnimeCollections([collectionsObj, ...animeCollections]);
  };

  console.log("[animeCollections]", animeCollections);

  useEffect(() => {
    localStorage.setItem("animeCollections", JSON.stringify(animeCollections));
  }, [animeCollections]);

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
        <div
          className={css`
            margin: 1em;
          `}
          dangerouslySetInnerHTML={{ __html: animeDetail.description }}
        />

        <button onClick={onHandleAddToCollection} className="ui primary button">
          Add to Collection
        </button>
      </div>
    </>
  );
};

export default AnimeDetailPage;
