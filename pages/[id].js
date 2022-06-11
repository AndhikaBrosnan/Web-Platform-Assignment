import React from "react";

const AnimeDetailPage = () => {
  const dummyMedia = useAnimeListQuery();

  return (
    <div>
      <h1>Anime Detail Page</h1>
      {dummyMedia}
    </div>
  );
};

export default AnimeDetailPage;
