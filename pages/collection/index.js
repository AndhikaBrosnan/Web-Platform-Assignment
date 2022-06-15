import React, { useEffect, useState } from "react";
import { css, cx } from "@emotion/css";
import { useRouter } from "next/router";
import {
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Text,
  useToast,
  Box,
  Link,
} from "@chakra-ui/react";
import MultiSelectAnime from "../../component/multiSelectAnime";
import { useSelector } from "react-redux";

const CollectionList = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [animeCollections, setAnimeCollections] = useState([]);
  const [collectionName, setCollectionName] = useState("");

  const selectedAnime = useSelector(({ anime }) => anime);

  const onHandleItemClick = (id) => {
    router.push(`/collection?id=${id}`);
    onOpen();
  };

  const onHandleDelete = (deletedId) => {
    let confirmation = "Confirm Delete?";
    if (!confirm(confirmation)) {
      return;
    }

    const filteredCollections = animeCollections.filter(
      (item) => item !== deletedId
    );
    localStorage.removeItem(deletedId);
    setAnimeCollections(filteredCollections);
  };

  let localAnimeStorage;
  useEffect(() => {
    if (typeof window !== "undefined") {
      localAnimeStorage = JSON.parse(localStorage.getItem("animeCollections"));

      if (localAnimeStorage) {
        setAnimeCollections(localAnimeStorage);
      } else {
        setAnimeCollections([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("animeCollections", JSON.stringify(animeCollections));
  }, [animeCollections]);

  useEffect(() => {
    if (router.query.id) {
      setCollectionName(router.query.id);
      onOpen();
    }
  }, [router.query.id]);

  const onHandleAddCollection = () => {
    if (collectionName.length < 1) {
      toast({
        title: "Error.",
        description: "Collection Name is required.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (router.query.id) {
      setAnimeCollections([
        ...animeCollections.filter((item) => item !== router.query.id),
        collectionName,
      ]);
      localStorage.removeItem(router.query.id);
    } else if (!animeCollections.includes(collectionName)) {
      setAnimeCollections([...animeCollections, collectionName]);
    }
    localStorage.setItem(collectionName, JSON.stringify(selectedAnime));

    toast({
      title: "Success.",
      description: "Collection Created.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setCollectionName("");
    router.push("/collection");
    onClose();
  };

  const onCloseModal = () => {
    router.push("/collection");
    onClose();
  };

  return (
    <>
      {/* Start: Modal */}
      <Modal isOpen={isOpen} onClose={onCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Multiple Collection</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            className={css`
              position: relative;
            `}
          >
            <Text>Input Collection Name</Text>
            <Input
              placeholder="Collection Name..."
              onChange={(e) => setCollectionName(e.target.value)}
              value={collectionName}
            />
            <MultiSelectAnime />
          </ModalBody>

          <Button
            className={css`
              position: fixed;
              bottom: 2em;
              right: 2em;
              @media (min-width: 768px) {
                right: 37vw;
              }
            `}
            colorScheme="blue"
            mr={3}
            onClick={onHandleAddCollection}
          >
            Save
          </Button>
        </ModalContent>
      </Modal>
      {/* End: Modal */}
      <Box
        className={css`
          margin-top: 3em;
          margin: 0.5em;
        `}
      >
        <Heading as="h1" size="lg">
          ANIME COLLECTIONS
        </Heading>

        <Button
          className={css`
            margin-top: 2em;
            margin-left: 3em;
          `}
          onClick={onOpen}
        >
          Add a Collection
        </Button>

        <div
          className={css`
            margin-top: 2em;
          `}
        >
          {(!animeCollections || animeCollections.length === 0) && (
            <div
              className={css`
                text-align: center;
              `}
            >
              You don't have anime collections yet. Add it{" "}
              <Link color="blue" href="/collection" onClick={onOpen}>
                here
              </Link>
            </div>
          )}

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
            {animeCollections?.map((item, i) => {
              return (
                <Box
                  className={css`
                    position: relative;
                    cursor: pointer;
                    border-radius: 8px;
                    border-style: solid;
                    border-width: 0.5px;
                    height: 3.5em;
                  `}
                >
                  <div
                    className={css`
                      position: absolute;
                      top: 4px;
                      right: 4px;
                      z-index: 10;
                    `}
                  >
                    <Button
                      size="xs"
                      colorScheme="red"
                      onClick={() => onHandleDelete(item)}
                    >
                      X
                    </Button>
                  </div>
                  <div
                    key={i}
                    className={css`
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                    `}
                    onClick={() => onHandleItemClick(item)}
                  >
                    <p
                      className={css`
                        margin-top: 1em;
                      `}
                    >
                      {item}
                    </p>
                  </div>
                </Box>
              );
            })}
          </Box>
        </div>
      </Box>
    </>
  );
};

export default CollectionList;
