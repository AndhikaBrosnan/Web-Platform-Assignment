import React, { useEffect, useState } from "react";
import { css, cx } from "@emotion/css";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAnimeDetailQuery } from "../hooks/useAnimeDetailQuery";
import {
  Button,
  Heading,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import CollectionsComponent from "../component/collectionsComponent";

const AnimeDetailPage = () => {
  const { asPath } = useRouter();
  const pathnameDetail = asPath.slice(1);
  const toast = useToast();

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
        toast({
          title: "Success.",
          description: `Anime ${animeDetail?.title?.romaji} added to Collection`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        setAck(false);
      }, 2000);
    }
  }, [ack]);

  const animeDetail = useAnimeDetailQuery(parseInt(pathnameDetail));

  const onHandleAddToCollection = () => {
    onOpen();
    const collectionsObj = {
      id: animeDetail.id,
      coverImage: animeDetail.coverImage,
      bannerImage: animeDetail.bannerImage,
      title: animeDetail.title,
    };

    setAnimeCollections([collectionsObj, ...animeCollections]);
    setAck(true);
  };

  const onHandleItemClick = (item) => {
    const collectionsObj = {
      id: animeDetail.id,
      coverImage: animeDetail.coverImage,
      bannerImage: animeDetail.bannerImage,
      title: animeDetail.title,
    };
    localStorage.setItem(item, JSON.stringify(collectionsObj));
  };

  useEffect(() => {
    // localStorage.setItem("animeCollections", JSON.stringify(animeCollections));
  }, [animeCollections]);

  const isAlreadyExist =
    animeCollections.filter((item) => item.id === animeDetail.id).length > 0;

  const { isOpen, onOpen, onClose } = useDisclosure();

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
              onHandleItemClick={onHandleItemClick}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div
        className={css`
          margin: 1em 0;
          text-align: center;
        `}
      >
        <Head>
          <title>Anime Detail</title>
        </Head>
        <Heading
          as="h1"
          size="lg"
          className={css`
            margin-bottom: 1em;
          `}
        >
          {animeDetail?.title?.romaji}
        </Heading>
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

        <Button
          colorScheme="teal"
          onClick={onHandleAddToCollection}
          className={`ui primary button ${isAlreadyExist && `disabled`}`}
        >
          Add to Collection
        </Button>
      </div>
    </>
  );
};

export default AnimeDetailPage;
