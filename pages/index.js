import Head from "next/head";
import { useEffect, useState } from "react";
import { useAnimeListQuery } from "../hooks/useAnimeListQuery";
import { css, cx } from "@emotion/css";
import { useRouter } from "next/router";
import PaginationComponent from "../component/paginationComponent";
import {
  Heading,
  Box,
  Button,
  Image,
  Text,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import CollectionsComponent from "../component/collectionsComponent";

const LandingPage = () => {
  const router = useRouter();

  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [animeBulkAdd, setAnimeBulkAdd] = useState([]);

  const mediaList = useAnimeListQuery(page, perPage);

  useEffect(() => {
    if (mediaList) {
      setAnimeList(mediaList);
    }
  }, [mediaList]);

  const onHandleItemClick = (id) => {
    router.push(`/${id}`);
  };

  const onHandleChangePage = (value) => {
    setPage(value);
  };

  const onHandleBulkDownload = () => {
    // Pick Collection
    onOpen();
  };

  const onHandleAddSelectedCollection = (item) => {
    const isExist = animeBulkAdd.some((itemVal) => itemVal.id === item.id);
    if (isExist) {
      setAnimeBulkAdd(animeBulkAdd.filter((val) => val.id !== item.id));
    } else {
      setAnimeBulkAdd([...animeBulkAdd, item]);
    }
  };

  // Start: Modal Variable
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onHandleItemClickModal = (item) => {
    let selectedCollection = JSON.parse(localStorage.getItem(item));
    let populateCollection = selectedCollection.selectedAnimes;

    let addNewAnimeToCollection = {
      selectedAnimes: [...populateCollection, ...animeBulkAdd],
    };

    localStorage.setItem(item, JSON.stringify(addNewAnimeToCollection));

    toast({
      title: "Success.",
      description: `Animes has been added to Collection`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    onClose();
  };
  // End: Modal Variable

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Which Collection?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CollectionsComponent
              onOpen={onOpen}
              onHandleItemClick={onHandleItemClickModal}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box
        className={css`
          margin-top: 2em;
          margin: 0.5em;
        `}
      >
        <Head>
          <title>Anime List</title>
        </Head>
        <Heading as="h1" size="lg">
          LIST OF ANIMES
        </Heading>

        <Box
          className={css`
            margin-top: 2em;
          `}
        >
          <Button
            className={css`
              margin-left: 2em;
            `}
            colorScheme="teal"
            size="sm"
            onClick={onHandleBulkDownload}
          >
            Bulk Add to Collection
          </Button>
        </Box>

        <Box
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
            const isExist = animeBulkAdd.some(
              (selected) => selected.id === item.id
            );
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
                <IconButton
                  size="sm"
                  className={css`
                    width: 90%;
                    margin: 0.5em 1em;
                    z-index: 2;
                  `}
                  variant="outline"
                  colorScheme={isExist ? "red" : "teal"}
                  aria-label="Send email"
                  background={isExist ? `red.100` : `green.100`}
                  icon={isExist ? <MinusIcon /> : <AddIcon />}
                  onClick={() => onHandleAddSelectedCollection(item)}
                />
              </Box>
            );
          })}
          <PaginationComponent
            page={page}
            onHandleChangePage={onHandleChangePage}
          />
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;
