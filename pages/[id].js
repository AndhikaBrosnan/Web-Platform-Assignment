import React, { useEffect, useState } from "react";
import { css, cx } from "@emotion/css";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAnimeDetailQuery } from "../hooks/useAnimeDetailQuery";

const AnimeDetailPage = () => {
  const { asPath } = useRouter();
  const pathnameDetail = asPath.slice(1);

  const [animeCollections, setAnimeCollections] = useState([]);
  const [ack, setAck] = useState(false);

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

  useEffect(() => {
    if (ack === true) {
      setTimeout(function () {
        setAck(false);
      }, 2000);
    }
  }, [ack]);

  const animeDetail = useAnimeDetailQuery(parseInt(pathnameDetail));

  const onHandleAddToCollection = () => {
    const collectionsObj = {
      id: animeDetail.id,
      coverImage: animeDetail.coverImage,
      title: animeDetail.title,
    };

    setAnimeCollections([collectionsObj, ...animeCollections]);
    setAck(true);
  };

  useEffect(() => {
    localStorage.setItem("animeCollections", JSON.stringify(animeCollections));
  }, [animeCollections]);

  return (
    <div
      className={css`
        margin: 1em 0;
        text-align: center;
      `}
    >
      <Head>
        <title>Anime Detail</title>
      </Head>
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

      {/* Ack */}
      {ack && (
        <div className="ui positive message">
          <div className="header">Success!</div>
          <p>
            Anime <b>{animeDetail?.title?.romaji} added to collections.</b>
          </p>
        </div>
      )}
    </div>
  );
};

export default AnimeDetailPage;
