import Head from "next/head";
import { useEffect, useState } from "react";
import { useAnimeListQuery } from "../hooks/useAnimeListQuery";

const LandingPage = () => {
  const mediaList = useAnimeListQuery();

  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    if (mediaList) {
      setAnimeList(mediaList);
    }
  }, [mediaList]);

  return (
    <>
      <Head>
        ]<title>Anime List</title>
      </Head>
      <h1>Here's the Anime List Objects</h1>
      {animeList.map((item, i) => {
        return (
          <div key={i}>
            <img
              src={item.bannerImage}
              alt="Girl in a jacket"
              width="500"
              height="600"
            />
            <p>{item.title?.romaji}</p>
            testing
          </div>
        );
      })}
    </>
  );
};

export default LandingPage;
