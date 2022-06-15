import {
  Box,
  Image,
  Text,
  IconButton,
  Heading,
  Center,
} from "@chakra-ui/react";
import { css, cx } from "@emotion/css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const CollectionDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const animesObj = JSON.parse(localStorage.getItem(id));
      if (animesObj) {
        setAnimeList(animesObj.selectedAnimes);
      }
    }
  }, [id]);

  const onHandleItemClick = (id) => {
    router.push(`/${id}`);
  };
  return (
    <Box
      className={css`
        margin: 0.5;
      `}
    >
      <Center>
        <Heading>Collection {id}</Heading>
      </Center>
      <Box
        className={css`
          margin: 3em 18%;
          display: grid;
          grid-template-columns: auto auto auto auto auto;
          grid-gap: 1em;
          @media (max-width: 768px) {
            grid-template-columns: auto auto;
            margin: 1em 0.5em;
          }
        `}
      >
        {animeList.map((item, i) => {
          return (
            <Box
              key={i}
              className={css`
                width: 13em;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                border-radius: 8px;
                border-style: solid;
                border-width: 0.5px;
                @media (max-width: 768px) {
                  width: 10.7em;
                }
              `}
            >
              <Image
                className={css`
                  object-fit: cover;
                  height: 85%;
                `}
                src={item.coverImage.large}
                alt="Cover Image"
                onClick={() => onHandleItemClick(item.id)}
              />
              <Text
                className={css`
                  margin-top: 1em;
                  font-weight: 400;
                `}
                onClick={() => onHandleItemClick(item.id)}
              >
                {item.title?.romaji}
              </Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default CollectionDetail;
