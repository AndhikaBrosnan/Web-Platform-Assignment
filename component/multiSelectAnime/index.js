import React, { useState, useEffect } from "react";
import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import { useAnimeListQuery } from "../../hooks/useAnimeListQuery";
import { css, cx } from "@emotion/css";
import { setSelectedAnimeAction } from "../../store/actions/animeAction";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const MultiSelectAnime = () => {
  const mediaList = useAnimeListQuery();
  const [animeList, setAnimeList] = useState([]);
  const [selectedAnimeList, setSelectedAnimeList] = useState([]);
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (mediaList) {
      setAnimeList(mediaList);
    }
  }, [mediaList]);

  const onHandleSelectAnime = (item) => {
    if (!selectedAnimeList.some((selected) => selected.id === item.id)) {
      setSelectedAnimeList([...selectedAnimeList, item]);
      setSelectedAnimeAction(dispatch, [...selectedAnimeList, item]);
    } else {
      setSelectedAnimeList(
        selectedAnimeList.filter((selected) => selected.id !== item.id)
      );
      setSelectedAnimeAction(
        dispatch,
        selectedAnimeList.filter((selected) => selected.id !== item.id)
      );
    }
  };

  useEffect(() => {
    if (router.query.id) {
      setSelectedAnimeList(
        JSON.parse(localStorage.getItem(router.query.id)).selectedAnimes
      );
    }
  }, [router.query.id]);

  return (
    <Box mt={3}>
      <Heading as="h1" size="lg">
        Select your Animes
      </Heading>
      <Box>
        <div
          className={css`
            display: grid;
            grid-template-columns: auto auto auto;
            grid-gap: 4px;
            @media (max-width: 768px) {
              grid-template-columns: auto auto;
              margin: 1em 0;
            }
          `}
        >
          {animeList.map((item, i) => {
            return (
              <Flex
                key={i}
                className={css`
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  cursor: pointer;
                  border-radius: 8px;
                  border-style: solid;
                  border-width: 0.5px;
                  background: ${selectedAnimeList.some(
                    (selected) => selected.id === item.id
                  ) && `#00FF00`};
                `}
                onClick={() => onHandleSelectAnime(item)}
              >
                <Text
                  className={css`
                    margin-top: 1em;
                    text-align: center;
                  `}
                >
                  {item.title?.romaji}
                </Text>
              </Flex>
            );
          })}
        </div>
      </Box>
    </Box>
  );
};

export default MultiSelectAnime;
